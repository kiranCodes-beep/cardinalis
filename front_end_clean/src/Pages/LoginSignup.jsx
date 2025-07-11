import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { toast } from 'react-hot-toast';
import './LoginSignup.css';

export const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, googleSignIn } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin && !displayName) {
      newErrors.displayName = 'Display name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Modify the handleSubmit function in LoginSignup.jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) return;
  
  setLoading(true);
  setErrors({});

  try {
    if (isLogin) {
      await login(email, password);
      toast.success('Logged in successfully!');
      navigate(location.state?.from || '/');
    } else {
      await register(email, password, displayName);
      toast.success('Account created successfully!');
      navigate(location.state?.from || '/');
    }
  } catch (error) {
    let errorMessage = error.message;
    
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'No account found with this email';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Incorrect password';
    } else if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'Email already in use';
    }
    
    toast.error(errorMessage);
  } finally {
    setLoading(false);
  }
};

// Update the Google login handler
const handleGoogleSignIn = async () => {
  try {
    setLoading(true);
    await googleSignIn();
    toast.success('Logged in with Google successfully!');
    navigate(location.state?.from || '/');
  } catch (error) {
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="displayName">Display Name</label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your name"
              className={errors.displayName ? 'error' : ''}
            />
            {errors.displayName && <span className="error-message">{errors.displayName}</span>}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <button 
          type="submit" 
          className="auth-btn" 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <span className="spinner"></span>
          ) : isLogin ? 'Login' : 'Sign Up'}
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        <button 
          className="google-btn"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
            alt="Google logo" 
            className="google-logo"
          />
          Continue with Google
        </button>

        <p className="toggle-auth">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button 
            type="button"
            className="toggle-btn"
            onClick={() => {
              setIsLogin(!isLogin);
              setErrors({});
            }}
          >
            {isLogin ? ' Sign Up' : ' Login'}
          </button>
        </p>

        {isLogin && (
          <p className="forgot-password">
            <Link to="/forgot-password" className="forgot-link">
              Forgot password?
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};