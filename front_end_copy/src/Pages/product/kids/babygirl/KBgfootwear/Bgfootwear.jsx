import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './bgfootwear.css';

import bgfootwear1 from './bgfootwear.webp';

const Bgfootwear = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 1501,
      name: 'Pink Baby Booties',
      price: 999,
      oldPrice: 1299,
      image: bgfootwear1,
      details: 'Soft sole, cozy fleece lining, easy slip-on',
      description: 'Adorable pink baby booties designed for comfort and safety. Features soft soles for early walkers, cozy fleece lining for warmth, and easy slip-on design for convenience. Made from hypoallergenic materials safe for delicate baby skin.',
      rating: 4.8,
      sizes: ["0-6M", "6-12M", "12-18M", "18-24M"],
      colors: ["Pink"],
      images: [bgfootwear1],
      category: "Baby > Girls > Footwear > Booties"
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

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span 
        key={i}
        className={`star ${i < Math.floor(rating) ? 'filled' : ''} ${
          i === Math.floor(rating) && rating % 1 >= 0.5 ? 'half-filled' : ''
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="bgfootwear-container">
      <header className="bgfootwear-header">
        <h1 className="store-title">CARDINALIS</h1>
        <h2>Baby Girl Footwear (0–3 Years)</h2>
        <p>Comfortable and cute little shoes for your baby girl</p>
      </header>

      <div className="bgfootwear-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="bgfootwear-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="bgfootwear-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = '/images/placeholder.webp';
                    e.target.alt = 'Image not available';
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
              <div className="bgfootwear-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="bgfootwear-price">₹{product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                      <span className="old-price">₹{product.oldPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="rating">
                    {renderStars(product.rating)}
                    <span className="rating-value">({product.rating})</span>
                  </div>
                </div>
                <p className="bgfootwear-desc">{product.details}</p>
                <div className="size-selector">
                  <label>Size:</label>
                  <select className="size-dropdown" id={`size-${product.id}`}>
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div className="bgfootwear-actions">
                  <button 
                    className="bgfootwear-cart-btn"
                    onClick={() => handleAddToCart(
                      product, 
                      document.getElementById(`size-${product.id}`).value
                    )}
                  >
                    Add to Cart
                  </button>
                  <button className="bgfootwear-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Bgfootwear;