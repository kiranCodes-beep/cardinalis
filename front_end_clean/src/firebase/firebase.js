import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword as fbCreateUser,
  signInWithEmailAndPassword as fbSignIn,
  GoogleAuthProvider,
  signInWithPopup as fbSignInPopup,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged as fbOnAuthStateChanged,
  signOut as fbSignOut
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  serverTimestamp,
  collection,
  updateDoc,
  arrayUnion // Only declare this once
} from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyBR6rBSyeoMiIL2aD8FxrSsNLCPvo-_vjU",
  authDomain: "e-commerce-67bb4.firebaseapp.com",
  projectId: "e-commerce-67bb4",
  storageBucket: "e-commerce-67bb4.appspot.com",
  messagingSenderId: "338447279914",
  appId: "1:338447279914:web:16158443da453ae9966633"
};

// Initialize Firebase only once
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);


// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
// Use the correct region for functions
export const functions = getFunctions(app, "asia-south1");

if (process.env.NODE_ENV === 'development') {
  connectFunctionsEmulator(functions, 'localhost', 5010);
}

// Firestore Collections
const usersCollection = collection(db, 'users');
const productsCollection = collection(db, 'products');
const userCartsCollection = collection(db, 'userCarts');

// User Profile Management
const getUserProfile = async (uid) => {
  if (!uid) return null;
  try {
    const docSnap = await getDoc(doc(db, 'users', uid));
    return docSnap.exists() ? { uid, ...docSnap.data() } : null;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    throw new Error('User profile fetch failed');
  }
};

const createUserProfile = async (user, additionalData = {}) => {
  if (!user?.uid) throw new Error('No user UID provided');
  
  const userRef = doc(db, 'users', user.uid);
  try {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified || false,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      ...additionalData
    }, { merge: true });
    return await getUserProfile(user.uid);
  } catch (error) {
    console.error('Failed to create user profile:', error);
    throw new Error('User profile creation failed');
  }
};

const updateUserProfile = async (uid, data) => {
  try {
    await setDoc(doc(db, 'users', uid), data, { merge: true });
    return await getUserProfile(uid);
  } catch (error) {
    console.error('Profile update failed:', error);
    throw error;
  }
};

// Cart Management
const getUserCart = async (uid) => {
  try {
    const cartSnap = await getDoc(doc(db, 'userCarts', uid));
    return cartSnap.exists() ? cartSnap.data() : { items: [], coupon: null, discount: 0 };
  } catch (error) {
    console.error('Error getting user cart:', error);
    return { items: [], coupon: null, discount: 0 };
  }
};

const updateUserCart = async (uid, cartData) => {
  try {
    await setDoc(doc(db, 'userCarts', uid), {
      ...cartData,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error updating user cart:', error);
    throw error;
  }
};

const mergeCarts = async (userId, guestCart) => {
  try {
    if (!guestCart?.items || guestCart.items.length === 0) return true;

    const userCartRef = doc(db, 'userCarts', userId);
    const userCartSnap = await getDoc(userCartRef);

    if (userCartSnap.exists()) {
      // Merge items, avoiding duplicates
      const existingItems = userCartSnap.data().items || [];
      const newItems = guestCart.items.filter(guestItem => 
        !existingItems.some(existingItem => 
          existingItem.id === guestItem.id && 
          existingItem.size === guestItem.size &&
          existingItem.color === guestItem.color
        )
      );

      if (newItems.length > 0) {
        await updateDoc(userCartRef, {
          items: arrayUnion(...newItems),
          updatedAt: serverTimestamp()
        });
      }
    } else {
      // Create new cart with guest items
      await setDoc(userCartRef, {
        items: guestCart.items,
        coupon: guestCart.coupon || null,
        discount: guestCart.discount || 0,
        updatedAt: serverTimestamp()
      });
    }

    return true;
  } catch (error) {
    console.error('Error merging carts:', error);
    throw error;
  }
};

const clearUserCart = async (userId) => {
  try {
    await setDoc(doc(db, 'userCarts', userId), {
      items: [],
      coupon: null,
      discount: 0,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error clearing user cart:', error);
    throw error;
  }
};

// Authentication Services
// Updated registerUser function with better error handling
const registerUser = async (email, password, userData = {}) => {
  try {
    // 1. Create auth user
    const { user } = await fbCreateUser(auth, email, password);
    
    // 2. Send verification email
    await sendEmailVerification(user);
    
    // 3. Prepare user document data
    const userDoc = {
      uid: user.uid,
      email: user.email,
      emailVerified: false,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      ...userData,
      // Ensure critical fields aren't overwritten
      isAdmin: userData.isAdmin || false,
      disabled: false
    };

    // 4. Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), userDoc);
    
    // 5. Create empty cart for the user
    await setDoc(doc(db, 'userCarts', user.uid), {
      items: [],
      coupon: null,
      discount: 0,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp()
    });

    // 6. Return complete user data
    return { 
      user, 
      profile: userDoc,
      cart: { items: [] } 
    };
    
  } catch (error) {
    console.error('Registration failed:', error);
    
    // Handle specific error cases
    let errorMessage = 'Registration failed. Please try again.';
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'Email already in use';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Password should be at least 6 characters';
    }
    
    throw new Error(errorMessage);
  }
};

const loginUser = async (email, password) => {
  try {
    // Clear any existing cart data in memory before login
    localStorage.removeItem('cart');
    
    const { user } = await fbSignIn(auth, email, password);
    await updateUserProfile(user.uid, { lastLogin: serverTimestamp() });
    const profile = await getUserProfile(user.uid);
    
    // Clear any previous cart data from localStorage
    localStorage.removeItem('cart');
    
    // Load fresh cart from user's Firestore record
    const userCart = await getUserCart(user.uid);
    
    return { 
      user, 
      profile,
      cart: userCart // Return the user's cart data
    };
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

const logoutUser = async () => {
  try {
    // Clear cart from localStorage on logout
    localStorage.removeItem('cart');
    await fbSignOut(auth);
    return true;
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};

// Social Login
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

const loginWithGoogle = async () => {
  try {
    // Clear any existing cart data in memory before login
    localStorage.removeItem('cart');
    
    const { user } = await fbSignInPopup(auth, googleProvider);
    const profile = await createUserProfile(user, {
      displayName: user.displayName,
      photoURL: user.photoURL,
      provider: 'google'
    });
    
    // Clear any previous cart data from localStorage
    localStorage.removeItem('cart');
    
    // Load fresh cart from user's Firestore record
    const userCart = await getUserCart(user.uid);
    
    return { 
      user, 
      profile,
      cart: userCart // Return the user's cart data
    };
  } catch (error) {
    console.error('Google login failed:', error);
    throw error;
  }
};


// Account Services
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    console.error('Password reset failed:', error);
    throw error;
  }
};

// Auth State Listener
const initAuthListener = (callback) => {
  return fbOnAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const profile = await getUserProfile(user.uid);
        callback({ ...user, ...profile, isAdmin: profile?.isAdmin || false });
      } catch (error) {
        console.error('Auth state error:', error);
        callback(null);
      }
    } else {
      callback(null);
    }
  });
};

// Helper Functions
const getCurrentUser = () => auth.currentUser;

const checkAdminStatus = async (uid) => {
  const profile = await getUserProfile(uid);
  return profile?.isAdmin || false;
};

// Single export block with ALL required exports
export {
  app,
  auth,
  db,
  
  // Auth methods
  fbCreateUser,
  fbSignIn,
  fbSignOut,
  fbOnAuthStateChanged,
  // Firestore methods
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  collection,
  // Other methods
  registerUser,
  loginUser,
  loginWithGoogle,
  sendPasswordReset,
  updateUserProfile, // Add this line

  mergeCarts,      // Add this line
  getUserCart,     // Add this line
  // Collections
  usersCollection,
  productsCollection,
  userCartsCollection
};