import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { useCart } from '../../Context/CartContext'; // Add this import
import { auth } from '../../firebase/firebase';
import { signOut } from 'firebase/auth';
import { FaUser, FaShoppingCart, FaChevronDown } from 'react-icons/fa';
import './Navbar.css';
import logo from '../../Assets/web_logo.png';

export const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState("All");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { itemCount } = useCart(); // Now properly imported

  const navData = {
    Men: {
      Western: ['formal', 'jeans', 'joggers', 'trousers', 't-shirts'],
      Footwear: ['casuals', 'sneakers', 'shoes']
    },
    Women: {
      Western: ['jeans', 't-shirts', 'tops', 'trousers'],
      Ethnic: ['dresses', 'suits', 'kurtas', 'salvars'],
      Footwear: ['flat-shoes', 'flat-sandals', 'sneakers', 'handbags']
    },
    Kids: {
      'boys-3-14': ['jeans', 'shirts', 't-shirts'],
      'girls-3-14': ['dresses', 'jeans', 'skirts', 'tops'],
      'baby-boy-0-3': ['jackets', 'jeans', 'shirts'],
      'baby-girl-0-3': ['dresses', 'tops', 'footwear']
    },
    Beauty: {
      Fragrance: ['men-fragrance', 'women-fragrance'],
      Makeup: ['eye', 'face', 'lips-nails']
    },
    Accessories: {
      Men: ['belts', 'rings', 'wallets'],
      Women: ['glasses', 'handbags', 'watches']
    }
  };

  const formatDisplayName = (name) => {
    return name
      .replace(/-/g, ' ')
      .replace(/(^|\s)\S/g, char => char.toUpperCase())
      .replace('T Shirts', 'T-Shirts');
  };

  const handleCategoryClick = (category) => {
    setActiveMenu(category);
    navigate(`/${category.toLowerCase()}`);
    setHoveredCategory(null);
    setMobileMenuOpen(false);
  };

  const handleSubcategoryClick = (category, subcategory, item) => {
    setActiveMenu(category);
    
    if (category === 'Kids') {
      navigate(`/${category.toLowerCase()}/${subcategory}/${item}`);
    } else {
      navigate(`/${category.toLowerCase()}/${item}`);
    }
    
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
      setMobileMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className='navbar-container'>
      <div className="navbar">
        <div className="nav-logo">
          <img src={logo} alt="Cardinalis Logo" />
          <p>CARDINALIS</p>
        </div>
        
        <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <li 
            onClick={() => {
              setActiveMenu("All");
              navigate('/');
              setMobileMenuOpen(false);
            }}
            className={activeMenu === "All" ? "active" : ""}
          >
            <Link to='/'>All</Link>
          </li>

          {Object.keys(navData).map((category) => (
            <li
              key={category}
              className={activeMenu === category ? "active" : ""}
              onMouseEnter={() => setHoveredCategory(category)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Link 
                to={`/${category.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryClick(category);
                }}
              >
                {category} <FaChevronDown className="dropdown-arrow" />
              </Link>

              {hoveredCategory === category && (
                <div className="dropdown-menu">
                  {Object.keys(navData[category]).map((subcategory) => (
                    <div key={subcategory} className="dropdown-column">
                      <h4>{formatDisplayName(subcategory)}</h4>
                      <ul>
                        {navData[category][subcategory].map((item) => (
                          <li key={item}>
                            <Link 
                              to={
                                category === 'Kids' 
                                  ? `/${category.toLowerCase()}/${subcategory}/${item}`
                                  : `/${category.toLowerCase()}/${item}`
                              }
                              onClick={(e) => {
                                e.preventDefault();
                                handleSubcategoryClick(category, subcategory, item);
                              }}
                            >
                              {formatDisplayName(item)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="nav-right">
          {currentUser ? (
            <div className="user-dropdown">
              <div className="user-info">
                <FaUser className="user-icon" />
                <span className="user-email">{currentUser.email.split('@')[0]}</span>
              </div>
              <div className="dropdown-content">
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to='/login' className="login-btn">
              Login
            </Link>
          )}
          <Link to='/cart' className="cart-link">
            <FaShoppingCart className="cart-icon" />
            {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
          </Link>
        </div>
      </div>
    </div>
  );
};