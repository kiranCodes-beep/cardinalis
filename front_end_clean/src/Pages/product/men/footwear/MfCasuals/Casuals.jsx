import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './casuals.css';

import casuals1 from './casuals1.webp';
import casuals2 from './casuals2.webp';
import casuals3 from './casuals3.webp';

const Casuals = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 301,
      name: "Everyday Canvas Sneakers",
      price: 799,
      oldPrice: 999,
      image: casuals1,
      details: "Breathable upper with cushioned footbed",
      description: "Versatile canvas sneakers with arch support and a flexible rubber sole. Perfect for all-day wear with their lightweight construction and breathable materials.",
      features: ["Lightweight", "Flexible sole", "Machine washable"],
      rating: 4.6,
      sizes: [7, 8, 9, 10, 11],
      images: [casuals1, casuals2],
      category: "Men > Footwear > Casual"
    },
    {
      id: 302,
      name: "Slip-On Comfort Loafers",
      price: 899,
      image: casuals2,
      details: "Easy on/off design with memory foam",
      description: "Premium slip-on loafers featuring orthopedic memory foam insoles and a durable rubber outsole. The perfect combination of style and comfort for everyday wear.",
      features: ["Breathable lining", "Anti-slip sole", "All-day comfort"],
      rating: 4.8,
      sizes: [7, 8, 9, 10, 11, 12],
      images: [casuals2, casuals3],
      category: "Men > Footwear > Casual"
    },
    {
      id: 303,
      name: "Minimalist Walking Shoes",
      price: 699,
      oldPrice: 899,
      image: casuals3,
      details: "Barefoot feel with modern style",
      description: "Minimalist shoes designed to promote natural foot movement while providing protection. Features a wide toe box and ultra-thin sole for ground feedback.",
      features: ["Wide toe box", "Zero-drop sole", "Flexible construction"],
      rating: 4.5,
      sizes: [8, 9, 10, 11],
      images: [casuals3, casuals1],
      category: "Men > Footwear > Casual"
    }
  ];

  const handleAddToCart = (product, selectedSize) => {
    addToCart({
      id: `${product.id}-${selectedSize}`,
      name: `${product.name} (Size ${selectedSize})`,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: selectedSize
    });
    
    toast.success(`${product.name} (Size ${selectedSize}) added to cart!`, {
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
    <div className="cf-container">
      <header className="cf-header">
        <h1>Casual Footwear Collection</h1>
        <p>Designed for comfort in everyday life</p>
      </header>

      <div className="cf-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="cf-card">
              <div className="cf-image-container">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="cf-product-image"
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
                <span className="cf-badge">Casual</span>
              </div>
              
              <div className="cf-details">
                <h3>{product.name}</h3>
                <div className="cf-price-rating">
                  <div className="price-container">
                    <span className="cf-price">₹{product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                      <span className="old-price">₹{product.oldPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="cf-rating">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`cf-star ${i < Math.floor(product.rating) ? 'filled' : ''} ${
                          i === Math.floor(product.rating) && product.rating % 1 >= 0.5 ? 'half-filled' : ''
                        }`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="cf-rating-count">({product.rating})</span>
                  </div>
                </div>
                
                <p className="cf-description">{product.details}</p>
                
                <div className="cf-features">
                  <h4>Key Features:</h4>
                  <ul>
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="cf-size-selector">
                  <label>Size:</label>
                  <select className="cf-size-dropdown" id={`size-${product.id}`}>
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                
                <div className="cf-actions">
                  <button 
                    className="cf-add-to-cart"
                    onClick={() => handleAddToCart(product, document.getElementById(`size-${product.id}`).value)}
                  >
                    Add to Cart
                  </button>
                  <button className="cf-wishlist">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Casuals;