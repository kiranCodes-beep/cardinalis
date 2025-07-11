import React, { createContext, useContext, useEffect, useState } from 'react';
 

import { 
  auth,  // This is your auth instance
  fbSignIn,  // This should be your email/password signIn function
  doc,  // Firestore document reference
  getDoc,  // Firestore get document
  db , // Your Firestore database instance
  registerUser,  // Add this import
  loginWithGoogle,  // Add this import
  updateUserProfile ,
  sendPasswordReset,
   mergeCarts,      // Add this line
  getUserCart,     // Add this line
} from '../firebase/firebase';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          // Get additional user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setCurrentUser({ ...user, ...userDoc.data() });
          } else {
            setCurrentUser(user);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setCurrentUser(user);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
  try {
    setLoading(true);
    
    // Perform login
    const userCredential = await fbSignIn(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    
    if (!userDoc.exists()) {
      throw new Error('User profile not found');
    }

    // Load user's cart from Firestore
    const userCart = await getUserCart(userCredential.user.uid);
    
    // Update state
    setCurrentUser({ 
      ...userCredential.user, 
      ...userDoc.data() 
    });
    setCart(userCart.items || []);
    
    toast.success('Logged in successfully!');
  } catch (error) {
    // Error handling
    let errorMessage = 'Login failed';
    
    // Handle specific Firebase auth errors
    if (error.code === 'auth/wrong-password') {
      errorMessage = 'Incorrect password';
    } else if (error.code === 'auth/user-not-found') {
      errorMessage = 'User not found';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Too many attempts. Try again later';
    } else if (error.message === 'User profile not found') {
      errorMessage = 'User profile not found';
    }
    
    toast.error(errorMessage);
    throw error;
  } finally {
    setLoading(false);
  }
};


  const register = async (email, password, displayName) => {
    try {
      setLoading(true);
      const userCredential = await registerUser(email, password, { displayName });
      setCurrentUser(userCredential.user);
      
      toast.success('Account created successfully!');
      return userCredential;
    } catch (error) {
      let errorMessage = error.message;
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email already in use';
      }
      
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async () => {
  try {
    setLoading(true);
    const guestCart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
    
    const userCredential = await loginWithGoogle();
    
    if (guestCart.items.length > 0) {
      await mergeCarts(userCredential.user.uid, guestCart);
    }
    
    const userCart = await getUserCart(userCredential.user.uid);
    
    setCurrentUser({ 
      ...userCredential.user,
      cart: userCart
    });
    
    localStorage.removeItem('cart');
    toast.success('Logged in with Google successfully!');
    return userCredential;
  } catch (error) {
    // ... (keep existing error handling)
  } finally {
    setLoading(false);
  }
};

  const resetPassword = async (email) => {
  try {
    await sendPasswordReset(email);  // Change from resetPassword to sendPasswordReset
    toast.success('Password reset email sent!');
    return true;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

  const logout = async () => {
  try {
    setLoading(true);
    await auth.signOut();
    setCurrentUser(null);
    setCart([]); // Clear local cart state
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  } finally {
    setLoading(false);
  }
};

  const updateProfile = async (data) => {
    if (!currentUser) return Promise.reject('No user logged in');
    try {
      await updateUserProfile(currentUser.uid, data);
      setCurrentUser({ ...currentUser, ...data });
      toast.success('Profile updated successfully!');
      return true;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const value = {
    currentUser,
    cart,
    setCart,
    login,
    register,
    googleSignIn,
    resetPassword,
    logout,
    updateProfile,
    isAuthenticated: !!currentUser,
    isEmailVerified: currentUser?.emailVerified || false,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};