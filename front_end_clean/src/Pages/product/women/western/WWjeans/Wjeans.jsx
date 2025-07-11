import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './wjeans.css';

import jeans1 from './jeans_1 (1).webp';
import jeans2 from './jeans_1 (2).webp';
import jeans3 from './jeans_1 (3).webp';
import jeans4 from './jeans_1 (4).webp';

const Wjeans = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 801,
      name: 'Classic Blue Slim Fit Jeans',
      price: 1199,
      oldPrice: 1499,
      image: jeans1,
      details: 'Stretch denim, mid-rise waist',
      description: 'Comfortable slim fit jeans made with premium stretch denim for all-day comfort. Features a mid-rise waist and classic blue wash.',
      rating: 4.4,
      sizes: ["24", "26", "28", "30", "32"],
      colors: ["Blue"],
      images: [jeans1, jeans2],
      category: "Women > Bottoms > Jeans"
    },
    {
      id: 802,
      name: 'Black High-Rise Skinny Jeans',
      price: 1299,
      image: jeans2,
      details: 'Sculpting fit, ankle length',
      description: 'Flattering high-rise skinny jeans with sculpting technology. Jet black color with ankle-length cut perfect for pairing with heels or sneakers.',
      rating: 4.7,
      sizes: ["25", "27", "29", "31"],
      colors: ["Black"],
      images: [jeans2, jeans3],
      category: "Women > Bottoms > Jeans"
    },
    {
      id: 803,
      name: 'Distressed Light Blue Jeans',
      price: 1099,
      oldPrice: 1399,
      image: jeans3,
      details: 'Vintage wash, raw hem',
      description: 'Trendy distressed jeans with vintage light blue wash. Features raw hem details and comfortable stretch fabric.',
      rating: 4.2,
      sizes: ["24", "26", "28", "30"],
      colors: ["Light Blue"],
      images: [jeans3, jeans4],
      category: "Women > Bottoms > Jeans"
    },
    {
      id: 804,
      name: 'Dark Blue Bootcut Jeans',
      price: 1399,
      image: jeans4,
      details: 'Flared hem, long length',
      description: 'Classic bootcut jeans in dark blue wash. Features a slight flare at the hem and extra length for wearing with heels.',
      rating: 4.5,
      sizes: ["26", "28", "30", "32", "34"],
      colors: ["Dark Blue"],
      images: [jeans4, jeans1],
      category: "Women > Bottoms > Jeans"
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
    <div className="wjeans-container">
      <header className="wjeans-header">
        <h1 className="store-title">CARDINALIS</h1>
        <h2>Women's Jeans Collection</h2>
        <p>Stylish fits for every day and every curve</p>
      </header>

      <div className="wjeans-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="wjeans-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="wjeans-image"
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
              <div className="wjeans-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="wjeans-price">₹{product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                      <span className="old-price">₹{product.oldPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="rating">
                    {renderStars(product.rating)}
                    <span className="rating-value">({product.rating})</span>
                  </div>
                </div>
                <p className="wjeans-desc">{product.details}</p>
                <div className="size-selector">
                  <label>Size:</label>
                  <select className="size-dropdown" id={`size-${product.id}`}>
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div className="wjeans-actions">
                  <button 
                    className="wjeans-cart-btn"
                    onClick={() => handleAddToCart(
                      product, 
                      document.getElementById(`size-${product.id}`).value
                    )}
                  >
                    Add to Cart
                  </button>
                  <button className="wjeans-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Wjeans;