import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './handbags.css';

import bag1 from './handbags (1).webp';
import bag2 from './handbags (2).webp';
import bag3 from './handbags (3).webp';
import bag4 from './handbags (4).webp';
import bag5 from './handbags (5).webp';

const Handbags = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 1201,
      name: "Classic Beige Tote",
      price: 2499,
      oldPrice: 2999,
      image: bag1,
      details: "Spacious skin-tone handbag with dual straps",
      description: "Elegant beige tote bag with ample storage space and dual carrying options. Made from durable canvas with genuine leather accents and sturdy hardware.",
      rating: 4.5,
      colors: ["Beige"],
      styles: ["Tote"],
      materials: ["Canvas", "Leather"],
      images: [bag1, bag2],
      category: "Women > Accessories > Handbags > Totes"
    },
    {
      id: 1202,
      name: "Olive Green Shoulder Bag",
      price: 1999,
      image: bag2,
      details: "Trendy sling style with gold zip",
      description: "Fashionable olive green shoulder bag featuring premium vegan leather, gold-tone hardware, and multiple interior compartments for organization.",
      rating: 4.2,
      colors: ["Olive Green"],
      styles: ["Shoulder Bag"],
      materials: ["Vegan Leather"],
      images: [bag2, bag3],
      category: "Women > Accessories > Handbags > Shoulder Bags"
    },
    {
      id: 1203,
      name: "Vintage Brown Handbag",
      price: 2699,
      oldPrice: 3299,
      image: bag3,
      details: "Leather finish with brass buckle",
      description: "Timeless vintage-inspired brown handbag crafted from genuine leather with antique brass buckles and hardware. Features a structured silhouette with soft lining.",
      rating: 4.6,
      colors: ["Brown"],
      styles: ["Satchel"],
      materials: ["Genuine Leather"],
      images: [bag3, bag4],
      category: "Women > Accessories > Handbags > Satchels"
    },
    {
      id: 1204,
      name: "Minimalist White Pouch",
      price: 1799,
      image: bag4,
      details: "Compact, smooth finish with zip top",
      description: "Sleek white minimalist pouch with a smooth pebbled texture. Perfect for essentials with a secure zip-top closure and detachable crossbody strap.",
      rating: 4.3,
      colors: ["White"],
      styles: ["Clutch", "Crossbody"],
      materials: ["PU Leather"],
      images: [bag4, bag5],
      category: "Women > Accessories > Handbags > Clutches"
    },
    {
      id: 1205,
      name: "Dark Green Satchel",
      price: 2899,
      image: bag5,
      details: "Structured frame with long strap",
      description: "Sophisticated dark green satchel with structured frame, adjustable long strap, and multiple compartments. Features high-quality hardware and luxe lining.",
      rating: 4.7,
      colors: ["Dark Green"],
      styles: ["Satchel", "Crossbody"],
      materials: ["Full-grain Leather"],
      images: [bag5, bag1],
      category: "Women > Accessories > Handbags > Satchels"
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
    <div className="fw-handbags-container">
      <header className="fw-handbags-header">
        <h1 className="store-title">CARDINALIS</h1>
        <h2>Women's Handbags Collection</h2>
        <p>Elegant bags to complement every style</p>
      </header>

      <div className="fw-handbags-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="fw-handbags-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="fw-handbags-image"
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
              <div className="fw-handbags-details">
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
                <div className="fw-actions">
                  <button 
                    className="fw-cart-btn"
                    onClick={() => handleAddToCart(product)}
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

export default Handbags;