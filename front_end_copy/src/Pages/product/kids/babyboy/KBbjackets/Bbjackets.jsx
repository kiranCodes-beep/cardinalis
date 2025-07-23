import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './bbjackets.css';

import bbjacket1 from './bbjackets (1).webp';
import bbjacket2 from './bbjackets (2).webp';
import bbjacket3 from './bbjackets (3).webp';

const Bbjackets = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 1301,
      name: 'Olive Green Puffer Jacket',
      price: 299,
      oldPrice: 399,
      image: bbjacket1,
      details: 'Warm and lightweight, hooded design',
      description: 'Cozy olive green puffer jacket for baby boys (0-3 years). Features a hooded design, lightweight insulation, and water-resistant outer shell. Perfect for cold weather protection.',
      rating: 4.7,
      sizes: ["0-3M", "3-6M", "6-12M", "12-18M", "18-24M", "2T-3T"],
      colors: ["Olive Green"],
      images: [bbjacket1, bbjacket2],
      category: "Baby > Boys > Clothing > Outerwear > Jackets"
    },
    {
      id: 1302,
      name: 'Blue Quilted Jacket',
      price: 249,
      image: bbjacket2,
      details: 'Zip-up front, fleece lining',
      description: 'Adorable blue quilted jacket with a full zip-up front and soft fleece lining. Provides warmth without bulk and features secure zipper guards for baby safety.',
      rating: 4.5,
      sizes: ["0-3M", "3-6M", "6-12M", "12-18M"],
      colors: ["Blue"],
      images: [bbjacket2, bbjacket3],
      category: "Baby > Boys > Clothing > Outerwear > Jackets"
    },
    {
      id: 1303,
      name: 'Navy Blue Windbreaker',
      price: 299,
      oldPrice: 399,
      image: bbjacket3,
      details: 'Water-resistant, breathable fabric',
      description: 'Lightweight navy blue windbreaker with water-resistant and breathable fabric. Features elastic cuffs and adjustable hood for customizable fit and protection.',
      rating: 4.3,
      sizes: ["6-12M", "12-18M", "18-24M", "2T-3T"],
      colors: ["Navy Blue"],
      images: [bbjacket3, bbjacket1],
      category: "Baby > Boys > Clothing > Outerwear > Jackets"
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
    <div className="bbj-container">
      <header className="bbj-header">
        <h1 className="store-title">CARDINALIS</h1>
        <h2>Baby Boy Jackets (0–3 Years)</h2>
        <p>Keep your little one cozy in style</p>
      </header>

      <div className="bbj-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="bbj-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="bbj-image"
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
              <div className="bbj-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="bbj-price">₹{product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                      <span className="old-price">₹{product.oldPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="rating">
                    {renderStars(product.rating)}
                    <span className="rating-value">({product.rating})</span>
                  </div>
                </div>
                <p className="bbj-desc">{product.details}</p>
                <div className="size-selector">
                  <label>Size:</label>
                  <select className="size-dropdown" id={`size-${product.id}`}>
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div className="bbj-actions">
                  <button 
                    className="bbj-cart-btn"
                    onClick={() => handleAddToCart(
                      product, 
                      document.getElementById(`size-${product.id}`).value
                    )}
                  >
                    Add to Cart
                  </button>
                  <button className="bbj-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Bbjackets;