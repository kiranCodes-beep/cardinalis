import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './gtops.css';

import gtop1 from './gtops (1).webp';
import gtop2 from './gtops (2).webp';
import gtop3 from './gtops (3).webp';

const Gtops = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 1901,
      name: 'Classic Black Top',
      price: 199,
      oldPrice: 299,
      image: gtop1,
      details: 'Cotton blend with frill sleeves',
      description: 'Versatile black top made from soft cotton blend with delicate frill sleeves. Features a comfortable fit and durable stitching that withstands multiple washes while maintaining its shape.',
      rating: 4.6,
      sizes: ["3T", "4T", "5-6", "7-8", "9-10", "11-12", "13-14"],
      colors: ["Black"],
      images: [gtop1, gtop2],
      category: "Girls > Clothing > Tops > Casual"
    },
    {
      id: 1902,
      name: 'Blue Denim Style Top',
      price: 149,
      image: gtop2,
      details: 'Light denim look, round neck',
      description: 'Stylish blue top with a denim-inspired look featuring a comfortable round neckline. Made from breathable fabric with reinforced stitching for active play.',
      rating: 4.3,
      sizes: ["4T", "5-6", "7-8", "9-10", "11-12"],
      colors: ["Blue"],
      images: [gtop2, gtop3],
      category: "Girls > Clothing > Tops > Denim"
    },
    {
      id: 1903,
      name: 'White Summer Top',
      price: 199,
      oldPrice: 299,
      image: gtop3,
      details: 'Lightweight fabric, floral trim',
      description: 'Airy white summer top with beautiful floral trim details. Made from lightweight, breathable fabric that keeps girls cool and comfortable in warm weather.',
      rating: 4.4,
      sizes: ["3T", "4T", "5-6", "7-8", "9-10"],
      colors: ["White"],
      images: [gtop3, gtop1],
      category: "Girls > Clothing > Tops > Summer"
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
    <div className="gtop-container">
      <header className="gtop-header">
        <h1 className="store-title">CARDINALIS</h1>
        <h2>Girls Tops (Ages 3–14)</h2>
        <p>Trendy tops to brighten up every outfit</p>
      </header>

      <div className="gtop-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="gtop-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="gtop-image"
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
              <div className="gtop-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="gtop-price">₹{product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                      <span className="old-price">₹{product.oldPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="rating">
                    {renderStars(product.rating)}
                    <span className="rating-value">({product.rating})</span>
                  </div>
                </div>
                <p className="gtop-desc">{product.details}</p>
                <div className="size-selector">
                  <label>Size:</label>
                  <select className="size-dropdown" id={`size-${product.id}`}>
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div className="gtop-actions">
                  <button 
                    className="gtop-cart-btn"
                    onClick={() => handleAddToCart(
                      product, 
                      document.getElementById(`size-${product.id}`).value
                    )}
                  >
                    Add to Cart
                  </button>
                  <button className="gtop-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Gtops;