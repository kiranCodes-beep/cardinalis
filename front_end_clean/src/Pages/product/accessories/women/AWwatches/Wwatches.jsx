import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './wwatches.css';

import watch1 from './wwatches (1).webp';
import watch2 from './wwatches (2).webp';

const Wwatches = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 2501,
      name: 'Elegant Pink Watch',
      price: 399,
      oldPrice: 499,
      image: watch1,
      details: 'Rose gold dial, soft pink strap',
      description: 'Feminine watch featuring a rose gold-tone case and soft pink leather strap. Includes Japanese quartz movement, mineral crystal glass face, and water resistance up to 30 meters. Perfect for both casual and formal occasions.',
      rating: 4.6,
      strapSizes: ["Small (6-6.5\")", "Medium (6.5-7\")", "Large (7-7.5\")"],
      colors: ["Rose Gold", "Pink"],
      materials: ["Stainless Steel Case", "Genuine Leather Strap"],
      features: ["30m Water Resistant", "Quartz Movement", "Date Display"],
      images: [watch1, watch2],
      category: "Women > Accessories > Watches > Dress Watches"
    },
    {
      id: 2502,
      name: 'Golden Blue Luxury Watch',
      price: 499,
      image: watch2,
      details: 'Blue dial, golden metal strap',
      description: 'Sophisticated timepiece with a striking blue sunray dial and gold-tone stainless steel bracelet. Features precise quartz movement, scratch-resistant mineral crystal, and secure deployment clasp. Water resistant to 50 meters.',
      rating: 4.8,
      strapSizes: ["Small (6-6.5\")", "Medium (6.5-7\")", "Large (7-7.5\")"],
      colors: ["Gold", "Blue"],
      materials: ["Stainless Steel", "Mineral Crystal"],
      features: ["50m Water Resistant", "Luminous Hands", "Date Window"],
      images: [watch2, watch1],
      category: "Women > Accessories > Watches > Luxury Watches"
    }
  ];

  const handleAddToCart = (product, selectedSize) => {
    addToCart({
      id: `${product.id}-${selectedSize}`,
      name: `${product.name} (${selectedSize})`,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: selectedSize
    });
    
    toast.success(`${product.name} (${selectedSize}) added to cart!`, {
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
    <div className="wwatches-container">
      <header className="wwatches-header">
        <h1 className="store-title">CARDINALIS</h1>
        <h2>Women's Watches</h2>
        <p>Stylish timepieces to complement your look</p>
      </header>

      <div className="wwatches-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="wwatches-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="wwatches-image"
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
              <div className="wwatches-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="wwatches-price">₹{product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                      <span className="old-price">₹{product.oldPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="rating">
                    {renderStars(product.rating)}
                    <span className="rating-value">({product.rating})</span>
                  </div>
                </div>
                <p className="wwatches-desc">{product.details}</p>
                <div className="size-selector">
                  <label>Strap Size:</label>
                  <select className="size-dropdown" id={`size-${product.id}`}>
                    {product.strapSizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div className="wwatches-actions">
                  <button 
                    className="wwatches-cart-btn"
                    onClick={() => handleAddToCart(
                      product, 
                      document.getElementById(`size-${product.id}`).value
                    )}
                  >
                    Add to Cart
                  </button>
                  <button className="wwatches-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Wwatches;