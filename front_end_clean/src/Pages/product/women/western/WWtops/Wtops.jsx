import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './wtops.css';

import top1 from './wtops (1).webp';
import top2 from './wtops (2).webp';
import top3 from './wtops (3).webp';
import top4 from './wtops (4).webp';

const Wtops = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 901,
      name: 'Solid Red Chic Top',
      price: 549,
      oldPrice: 649,
      image: top1,
      details: 'Elegant neckline, soft cotton',
      description: 'Classic red top with elegant neckline design. Made from premium soft cotton for all-day comfort. Perfect for both casual and semi-formal occasions.',
      rating: 4.3,
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Red"],
      images: [top1, top2],
      category: "Women > Tops > Casual"
    },
    {
      id: 902,
      name: 'Striped White & Red Top',
      price: 489,
      image: top2,
      details: 'Breezy fit, long sleeves',
      description: 'Breathable striped top with long sleeves. Features a relaxed fit and comfortable fabric that keeps you cool throughout the day.',
      rating: 4.5,
      sizes: ["S", "M", "L"],
      colors: ["White", "Red"],
      images: [top2, top3],
      category: "Women > Tops > Casual"
    },
    {
      id: 903,
      name: 'Sunny Yellow Sleeveless',
      price: 429,
      oldPrice: 499,
      image: top3,
      details: 'Lightweight, breathable fabric',
      description: 'Vibrant yellow sleeveless top made from lightweight, breathable fabric. Perfect for summer days and layering under jackets.',
      rating: 4.0,
      sizes: ["XS", "S", "M"],
      colors: ["Yellow"],
      images: [top3, top4],
      category: "Women > Tops > Summer"
    },
    {
      id: 904,
      name: 'Black & Skin Color Combo Top',
      price: 599,
      image: top4,
      details: 'Stylish contrast paneling',
      description: 'Fashion-forward top with black and skin-tone contrast panels. Features a modern cut and comfortable stretch fabric.',
      rating: 4.7,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Beige"],
      images: [top4, top1],
      category: "Women > Tops > Fashion"
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
    <div className="wtops-container">
      <header className="wtops-header">
        <h1 className="store-title">CARDINALIS</h1>
        <h2>Women's Tops Collection</h2>
        <p>Trendy styles to elevate your daily look</p>
      </header>

      <div className="wtops-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="wtops-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="wtops-image"
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
              <div className="wtops-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="wtops-price">₹{product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                      <span className="old-price">₹{product.oldPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="rating">
                    {renderStars(product.rating)}
                    <span className="rating-value">({product.rating})</span>
                  </div>
                </div>
                <p className="wtops-desc">{product.details}</p>
                <div className="size-selector">
                  <label>Size:</label>
                  <select className="size-dropdown" id={`size-${product.id}`}>
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div className="wtops-actions">
                  <button 
                    className="wtops-cart-btn"
                    onClick={() => handleAddToCart(
                      product, 
                      document.getElementById(`size-${product.id}`).value
                    )}
                  >
                    Add to Cart
                  </button>
                  <button className="wtops-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Wtops;