import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './fshoes.css';

import shoe1 from './shoes (1).webp';
import shoe2 from './shoes (2).webp';
import shoe3 from './shoes (3).webp';
import shoe4 from './shoes (4).webp';

const Fshoes = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 1001,
      name: "Classic Black Sneakers",
      price: 1399,
      oldPrice: 1799,
      image: shoe1,
      details: "Breathable mesh upper with cushioned sole",
      description: "Versatile black sneakers with breathable mesh upper and cushioned sole for all-day comfort. Perfect for casual wear and light workouts.",
      rating: 4.5,
      sizes: ["EU 36", "EU 37", "EU 38", "EU 39", "EU 40"],
      colors: ["Black"],
      images: [shoe1, shoe2],
      category: "Women > Footwear > Sneakers"
    },
    {
      id: 1002,
      name: "Sporty Black Trainers",
      price: 1599,
      image: shoe2,
      details: "Lightweight with arch support",
      description: "Performance-oriented black trainers with excellent arch support and lightweight construction. Ideal for running and gym workouts.",
      rating: 4.7,
      sizes: ["EU 37", "EU 38", "EU 39", "EU 40"],
      colors: ["Black"],
      images: [shoe2, shoe3],
      category: "Women > Footwear > Sports"
    },
    {
      id: 1003,
      name: "Casual White Runners",
      price: 1299,
      oldPrice: 1499,
      image: shoe3,
      details: "Minimalist design with comfort padding",
      description: "Clean white runners featuring minimalist design and premium comfort padding. Great for everyday casual wear.",
      rating: 4.3,
      sizes: ["EU 36", "EU 37", "EU 38", "EU 39"],
      colors: ["White"],
      images: [shoe3, shoe4],
      category: "Women > Footwear > Casual"
    },
    {
      id: 1004,
      name: "Black Everyday Shoes",
      price: 1499,
      image: shoe4,
      details: "Slip-on design, anti-skid sole",
      description: "Convenient slip-on shoes with anti-skid sole technology. Features a sleek black design suitable for both work and casual outings.",
      rating: 4.2,
      sizes: ["EU 35", "EU 36", "EU 37", "EU 38", "EU 39"],
      colors: ["Black"],
      images: [shoe4, shoe1],
      category: "Women > Footwear > Comfort"
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
    <div className="fw-shoes-container">
      <header className="fw-shoes-header">
        <h1 className="store-title">CARDINALIS</h1>
        <h2>Women's Shoes Collection</h2>
        <p>Perfect blend of comfort, durability & style</p>
      </header>

      <div className="fw-shoes-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="fw-shoes-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="fw-shoes-image"
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
              <div className="fw-shoes-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="fw-price">₹{product.price}</span>
                    {product.oldPrice && (
                      <span className="old-price">₹{product.oldPrice}</span>
                    )}
                  </div>
                  <div className="rating">
                    {renderStars(product.rating)}
                    <span className="rating-value">({product.rating})</span>
                  </div>
                </div>
                <p className="fw-desc">{product.details}</p>
                <div className="size-selector">
                  <label>Size:</label>
                  <select className="size-dropdown" id={`size-${product.id}`}>
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div className="fw-actions">
                  <button 
                    className="fw-cart-btn"
                    onClick={() => handleAddToCart(
                      product, 
                      document.getElementById(`size-${product.id}`).value
                    )}
                  >
                    Add to Cart
                  </button>
                  <button className="fw-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Fshoes;