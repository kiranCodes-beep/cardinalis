import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './bgdresses.css';

import bgdress1 from './bgdresses (1).webp';
import bgdress2 from './bgdresses (2).webp';
import bgdress3 from './bgdresses (3).webp';
import bgdress4 from './bgdresses (4).webp';

const Bgdresses = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 1401,
      name: 'Navy Blue Party Dress',
      price: 199,
      oldPrice: 299,
      image: bgdress1,
      details: 'Soft net fabric, floral embellishments',
      description: 'Adorable navy blue party dress with delicate floral embellishments and soft net fabric. Perfect for special occasions, featuring a comfortable fit and gentle materials safe for baby skin.',
      rating: 4.8,
      sizes: ["Newborn", "0-3M", "3-6M", "6-12M", "12-18M", "18-24M", "2T"],
      colors: ["Navy Blue"],
      images: [bgdress1, bgdress2],
      category: "Baby > Girls > Clothing > Dresses > Party"
    },
    {
      id: 1402,
      name: 'White Cotton Frock',
      price: 169,
      image: bgdress2,
      details: 'Sleeveless, button closure at back',
      description: 'Classic white cotton frock with easy back button closure. Made from breathable 100% cotton for all-day comfort, with gentle stitching perfect for delicate baby skin.',
      rating: 4.6,
      sizes: ["0-3M", "3-6M", "6-12M", "12-18M"],
      colors: ["White"],
      images: [bgdress2, bgdress3],
      category: "Baby > Girls > Clothing > Dresses > Casual"
    },
    {
      id: 1403,
      name: 'White Layered Dress',
      price: 199,
      oldPrice: 299,
      image: bgdress3,
      details: 'Tiered ruffles, comfy fit',
      description: 'Beautiful white layered dress with tiered ruffles and comfortable fit. Features soft, hypoallergenic fabric and non-scratch lace trim for maximum baby comfort.',
      rating: 4.7,
      sizes: ["3-6M", "6-12M", "12-18M", "18-24M"],
      colors: ["White"],
      images: [bgdress3, bgdress4],
      category: "Baby > Girls > Clothing > Dresses > Special Occasion"
    },
    {
      id: 1404,
      name: 'Classic White Dress',
      price: 179,
      image: bgdress4,
      details: 'Peter Pan collar, full sleeves',
      description: 'Timeless white dress featuring a darling Peter Pan collar and full sleeves. Made from easy-care fabric with reinforced stitching for durability through multiple washes.',
      rating: 4.5,
      sizes: ["Newborn", "0-3M", "3-6M", "6-12M"],
      colors: ["White"],
      images: [bgdress4, bgdress1],
      category: "Baby > Girls > Clothing > Dresses > Classic"
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
    <div className="bgdresses-container">
      <header className="bgdresses-header">
        <h1 className="store-title">CARDINALIS</h1>
        <h2>Baby Girl Dresses (0–3 Years)</h2>
        <p>Adorable dresses for your little princess</p>
      </header>

      <div className="bgdresses-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="bgdresses-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="bgdresses-image"
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
              <div className="bgdresses-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="bgdresses-price">₹{product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                      <span className="old-price">₹{product.oldPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="rating">
                    {renderStars(product.rating)}
                    <span className="rating-value">({product.rating})</span>
                  </div>
                </div>
                <p className="bgdresses-desc">{product.details}</p>
                <div className="size-selector">
                  <label>Size:</label>
                  <select className="size-dropdown" id={`size-${product.id}`}>
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div className="bgdresses-actions">
                  <button 
                    className="bgdresses-cart-btn"
                    onClick={() => handleAddToCart(
                      product, 
                      document.getElementById(`size-${product.id}`).value
                    )}
                  >
                    Add to Cart
                  </button>
                  <button className="bgdresses-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Bgdresses;