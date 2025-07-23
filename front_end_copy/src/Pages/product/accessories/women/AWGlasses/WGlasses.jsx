import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './wGlasses.css';

import wglass1 from './wGlasses (1).webp';
import wglass2 from './wGlasses (2).webp';
import wglass3 from './wGlasses (3).webp';

const WGlasses = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 2201,
      name: 'Black Oversized Sunglasses',
      price: 299,
      oldPrice: 399,
      image: wglass1,
      details: 'UV protection with wide square frame',
      description: 'Fashionable oversized sunglasses with 100% UV protection. Features wide square frames and gradient lenses for maximum style and eye protection.',
      rating: 4.6,
      colors: ["Black"],
      lensTypes: ["Polarized", "Non-Polarized"],
      frameMaterials: ["Acetate"],
      images: [wglass1, wglass2],
      category: "Accessories > Eyewear > Women"
    },
    {
      id: 2202,
      name: 'Classic Black Round Glasses',
      price: 199,
      image: wglass2,
      details: 'Retro round frames with tinted lenses',
      description: 'Vintage-inspired round glasses with lightly tinted lenses. Perfect for adding retro flair to any outfit while providing comfortable all-day wear.',
      rating: 4.5,
      colors: ["Black"],
      lensTypes: ["Tinted"],
      frameMaterials: ["Metal"],
      images: [wglass2, wglass3],
      category: "Accessories > Eyewear > Women"
    },
    {
      id: 2203,
      name: 'White Fashion Glasses',
      price: 199,
      oldPrice: 299,
      image: wglass3,
      details: 'Minimal white frames with clear lenses',
      description: 'Trendy white frame glasses with clear lenses for optical or fashion use. Lightweight design with spring hinges for comfortable wear.',
      rating: 4.3,
      colors: ["White"],
      lensTypes: ["Clear", "Blue Light"],
      frameMaterials: ["Plastic"],
      images: [wglass3, wglass1],
      category: "Accessories > Eyewear > Women"
    }
  ];

  const handleAddToCart = (product, selectedLensType) => {
    addToCart({
      id: `${product.id}-${selectedLensType.replace(/\s+/g, '-')}`,
      name: `${product.name} (${selectedLensType})`,
      price: product.price,
      image: product.image,
      quantity: 1,
      lensType: selectedLensType
    });
    
    toast.success(`${product.name} (${selectedLensType}) added to cart!`, {
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
    <div className="wglasses-container">
      <header className="wglasses-header">
        <h1>Women's Glasses</h1>
        <p>Trendy eyewear to elevate your look</p>
      </header>

      <div className="wglasses-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="wglasses-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="wglasses-image"
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
              <div className="wglasses-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="wglasses-price">₹{product.price.toFixed(2)}</span>
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
                <p className="wglasses-desc">{product.details}</p>
                <div className="lens-selector">
                  <label>Lens Type:</label>
                  <select className="lens-dropdown" id={`lens-${product.id}`}>
                    {product.lensTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className="wglasses-actions">
                  <button 
                    className="wglasses-cart-btn"
                    onClick={() => handleAddToCart(product, document.getElementById(`lens-${product.id}`).value)}
                  >
                    Add to Cart
                  </button>
                  <button className="wglasses-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default WGlasses;