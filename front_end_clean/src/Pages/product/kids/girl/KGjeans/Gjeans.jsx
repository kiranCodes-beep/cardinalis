import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './gjeans.css';

import gjeans1 from './gjeans (1).webp';
import gjeans2 from './gjeans (2).webp';
import gjeans3 from './gjeans (3).webp';

const Gjeans = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 1801,
      name: 'Olive Green Skinny Jeans',
      price: 299,
      oldPrice: 399,
      image: gjeans1,
      details: 'Stretch fit, high waist',
      description: 'Stylish olive green skinny jeans with premium stretch denim for maximum comfort. Features a high waist design and reinforced knees for durability during active play.',
      rating: 4.4,
      sizes: ["3T", "4T", "5-6", "7-8", "9-10", "11-12", "13-14"],
      colors: ["Olive Green"],
      images: [gjeans1, gjeans2],
      category: "Girls > Clothing > Bottoms > Jeans > Skinny"
    },
    {
      id: 1802,
      name: 'Blue Distressed Jeans',
      price: 249,
      image: gjeans2,
      details: 'Faded wash, ankle length',
      description: 'Trendy blue distressed jeans with a comfortable ankle-length cut. Made from soft denim with strategic distressing for a fashionable look that girls love.',
      rating: 4.6,
      sizes: ["4T", "5-6", "7-8", "9-10", "11-12"],
      colors: ["Blue"],
      images: [gjeans2, gjeans3],
      category: "Girls > Clothing > Bottoms > Jeans > Distressed"
    },
    {
      id: 1803,
      name: 'Classic Blue Jeans',
      price: 299,
      oldPrice: 399,
      image: gjeans3,
      details: 'Straight fit, durable denim',
      description: 'Classic straight-leg blue jeans made from durable denim that withstands active play. Features reinforced stitching and a comfortable waistband for all-day wear.',
      rating: 4.5,
      sizes: ["3T", "4T", "5-6", "7-8", "9-10", "11-12", "13-14"],
      colors: ["Blue"],
      images: [gjeans3, gjeans1],
      category: "Girls > Clothing > Bottoms > Jeans > Straight"
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
    <div className="gjeans-container">
      <header className="gjeans-header">
        <h1 className="store-title">CARDINALIS</h1>
        <h2>Girls Jeans (Ages 3–14)</h2>
        <p>Trendy and comfortable denim wear for girls</p>
      </header>

      <div className="gjeans-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="gjeans-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="gjeans-image"
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
              <div className="gjeans-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="gjeans-price">₹{product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                      <span className="old-price">₹{product.oldPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="rating">
                    {renderStars(product.rating)}
                    <span className="rating-value">({product.rating})</span>
                  </div>
                </div>
                <p className="gjeans-desc">{product.details}</p>
                <div className="size-selector">
                  <label>Size:</label>
                  <select className="size-dropdown" id={`size-${product.id}`}>
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div className="gjeans-actions">
                  <button 
                    className="gjeans-cart-btn"
                    onClick={() => handleAddToCart(
                      product, 
                      document.getElementById(`size-${product.id}`).value
                    )}
                  >
                    Add to Cart
                  </button>
                  <button className="gjeans-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Gjeans;