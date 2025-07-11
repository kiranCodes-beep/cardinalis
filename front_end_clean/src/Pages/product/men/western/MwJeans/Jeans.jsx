import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './jeans.css';

import jeans1 from './jeans1.webp';
import jeans2 from './jeans2.webp';
import jeans3 from './jeans3.webp';
import jeans4 from './jeans4.webp';

const Jeans = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 201,
      name: "Slim Fit Black Jeans",
      price: 199,
      oldPrice: 299,
      image: jeans1,
      details: "Classic black with stretch fabric",
      description: "Premium black denim with 2% elastane for comfort. Slim fit through hip and thigh with tapered leg.",
      rating: 4.5,
      images: [jeans1, jeans2],
      category: "Men > Western > Jeans"
    },
    {
      id: 202,
      name: "Dark Indigo Denim",
      price: 999,
      image: jeans2,
      details: "Mid-rise comfort fit",
      description: "100% cotton dark indigo denim with classic five-pocket styling. Mid-rise with comfortable straight leg.",
      rating: 4.2,
      images: [jeans2, jeans3],
      category: "Men > Western > Jeans"
    },
    {
      id: 203,
      name: "Beige Cargo Jeans",
      price: 1299,
      oldPrice: 1599,
      image: jeans3,
      details: "Utility style with side pockets",
      description: "Durable cotton-blend cargo jeans with multiple utility pockets. Relaxed fit with adjustable waist tab.",
      rating: 4.0,
      images: [jeans3, jeans4],
      category: "Men > Western > Jeans"
    },
    {
      id: 204,
      name: "Light Wash Baggy Jeans",
      price: 1099,
      image: jeans4,
      details: "Loose fit with fade effect",
      description: "Vintage-inspired light wash with authentic fade patterns. Oversized fit with distressed detailing.",
      rating: 3.8,
      images: [jeans4, jeans1],
      category: "Men > Western > Jeans"
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
    <div className="mw-jeans-container">
      <header className="mw-jeans-header">
        <h1>Men's Jeans Collection</h1>
        <p>Denims tailored for comfort and style</p>
      </header>

      <div className="mw-jeans-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="mw-jeans-card">
              <div className="image-container">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="mw-jeans-image"
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
              <div className="mw-jeans-details">
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

export default Jeans;