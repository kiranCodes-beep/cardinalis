import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './joggers.css';

import jogger1 from './joggers1.webp';
import jogger2 from './joggers2.webp';
import jogger3 from './joggers3.webp';
import jogger4 from './joggers4.webp';

const Joggers = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 301,
      name: "Olive Slim Fit Joggers",
      price: 399,
      oldPrice: 499,
      image: jogger1,
      details: "Drawstring waist, tapered fit",
      description: "Premium olive green joggers with slim tapered fit. Features drawstring waist and side pockets for functionality.",
      rating: 4.5,
      images: [jogger1, jogger2],
      category: "Men > Western > Joggers"
    },
    {
      id: 302,
      name: "Beige Comfort Joggers",
      price: 399,
      image: jogger2,
      details: "Soft fleece, elastic cuffs",
      description: "Ultra-soft fleece joggers with elasticated cuffs and waistband for maximum comfort during lounging.",
      rating: 4,
      images: [jogger2, jogger3],
      category: "Men > Western > Joggers"
    },
    {
      id: 303,
      name: "Relaxed Fit Shorts",
      price: 299,
      oldPrice: 399,
      image: jogger3,
      details: "Breathable cotton, summer fit",
      description: "Lightweight cotton shorts with relaxed fit, perfect for summer activities and casual outings.",
      rating: 3.8,
      images: [jogger3, jogger4],
      category: "Men > Western > Joggers"
    },
    {
      id: 304,
      name: "Navy Lounge Joggers",
      price: 499,
      image: jogger4,
      details: "Stretchable knit, lightweight",
      description: "Premium navy joggers made from stretchable knit fabric with moisture-wicking technology.",
      rating: 4.2,
      images: [jogger4, jogger1],
      category: "Men > Western > Joggers"
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
    <div className="mw-joggers-container">
      <header className="mw-joggers-header">
        <h1>Men's Joggers Collection</h1>
        <p>Casual comfort meets style</p>
      </header>
      
      <div className="mw-joggers-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="mw-joggers-card">
              <div className="image-container">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="mw-joggers-image"
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
              <div className="mw-joggers-details">
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

export default Joggers;