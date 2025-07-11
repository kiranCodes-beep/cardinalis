import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './formal.css';

import formal1 from './formal1.webp';
import formal2 from './formal2.webp';
import formal3 from './formal3.webp';
import formal4 from './formal4.webp';
import formal5 from './formal5.webp';

const Formal = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 101, // Changed to 3-digit ID for better uniqueness
      name: "Executive Navy Suit",
      price: 249.99, // Adjusted to more realistic price
      oldPrice: 299.99, // Added for discount display
      image: formal1,
      details: "Italian wool, notch lapels",
      description: "Premium Italian wool suit with modern slim fit and notch lapels. Perfect for business and formal occasions.",
      rating: 4.5,
      images: [formal1, formal2], // Added multiple images for product page
      category: "Men > Western > Formal"
    },
    {
      id: 102,
      name: "Classic Black Tuxedo",
      price: 299,
      oldPrice: 399,
      image: formal2,
      details: "Satin lapels, peak shawl",
      description: "Timeless black tuxedo with satin peak lapels and matching satin trim. Includes trousers with satin stripe.",
      rating: 5,
      images: [formal2, formal3],
      category: "Men > Western > Formal"
    },
    {
      id: 103,
      name: "Charcoal Gray Suit",
      price: 199,
      image: formal3,
      details: "Super 120s wool, slim fit",
      description: "High-quality Super 120s wool suit with contemporary slim fit. Versatile charcoal gray color.",
      rating: 4,
      images: [formal3, formal4],
      category: "Men > Western > Formal"
    },
    {
      id: 104,
      name: "Midnight Blue Blazer",
      price: 179,
      oldPrice: 229,
      image: formal4,
      details: "Two-button, patch pockets",
      description: "Elegant midnight blue blazer with two-button closure and stylish patch pockets.",
      rating: 3.5,
      images: [formal4, formal5],
      category: "Men > Western > Formal"
    },
    {
      id: 105,
      name: "White Dinner Jacket",
      price: 279,
      image: formal5,
      details: "Shawl collar, satin trim",
      description: "Sophisticated white dinner jacket with shawl collar and satin trim. Ideal for black tie events.",
      rating: 4.2,
      images: [formal5, formal1],
      category: "Men > Western > Formal"
    }
  ];

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    
    toast.success(`${product.name} added to cart!`, {
      duration: 2000,
      position: 'bottom-right',
      action: {
        label: 'View Cart',
        onClick: () => navigate('/cart')
      }
    });
  };

  const handleQuickView = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="mw-formal-container">
      <header className="mw-formal-header">
        <h1>Men's Formal Collection</h1>
        <p>Premium suits and tuxedos for every occasion</p>
      </header>
      
      <div className="mw-formal-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="mw-formal-card">
              <div className="image-container">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="mw-formal-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = '/images/placeholder.webp';
                    e.target.alt = 'Product image not available';
                  }}
                />
                {discount > 0 && (
                  <span className="discount-badge">-{discount}%</span>
                )}
                <button 
                  className="quick-view-btn"
                  onClick={() => handleQuickView(product.id)}
                >
                  Quick View
                </button>
              </div>
              <div className="mw-formal-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="mw-price">₹{product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                      <span className="old-price">₹{product.oldPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i}
                        className={`star ${i < Math.floor(product.rating) ? 'filled' : ''} ${
                          i === Math.floor(product.rating) && product.rating % 1 >= 0.5 ? 'half-filled' : ''
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mw-desc">{product.details}</p>
                <div className="mw-actions">
                  <button 
                    className="mw-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <button className="mw-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Formal;