import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './sandals.css';

import sandal1 from './sandals (1).webp';
import sandal2 from './sandals (2).webp';
import sandal3 from './sandals (3).webp';
import sandal4 from './sandals (4).webp';
import sandal5 from './sandals (5).webp';

const Sandals = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 1101,
      name: "Beige Strap Sandals",
      price: 899,
      oldPrice: 1099,
      image: sandal1,
      details: "Faux leather with ankle strap",
      description: "Elegant beige sandals featuring adjustable ankle straps and faux leather construction. Perfect for both casual and semi-formal occasions.",
      rating: 4.2,
      sizes: [4, 5, 6, 7, 8],
      colors: ["Beige"],
      images: [sandal1, sandal2],
      category: "Women > Footwear > Sandals"
    },
    {
      id: 1102,
      name: "Golden Party Flats",
      price: 1099,
      image: sandal2,
      details: "Shimmer finish, cushioned footbed",
      description: "Stylish golden sandals with shimmer finish and comfortable cushioned footbed. Ideal for parties and special occasions.",
      rating: 4.7,
      sizes: [5, 6, 7, 8],
      colors: ["Gold"],
      images: [sandal2, sandal3],
      category: "Women > Footwear > Sandals"
    },
    {
      id: 1103,
      name: "Black Buckle Sandals",
      price: 999,
      oldPrice: 1199,
      image: sandal3,
      details: "Double straps with gold buckle",
      description: "Chic black sandals featuring double straps with gold-tone buckle accents. Made from durable synthetic material.",
      rating: 4.3,
      sizes: [4, 5, 6, 7, 8, 9],
      colors: ["Black"],
      images: [sandal3, sandal4],
      category: "Women > Footwear > Sandals"
    },
    {
      id: 1104,
      name: "Brown Block Heels",
      price: 1199,
      image: sandal4,
      details: "2-inch heels with suede finish",
      description: "Sophisticated brown sandals with 2-inch block heels and premium suede finish. Provides both style and comfort.",
      rating: 4.5,
      sizes: [5, 6, 7],
      colors: ["Brown"],
      images: [sandal4, sandal5],
      category: "Women > Footwear > Sandals"
    },
    {
      id: 1105,
      name: "White Casual Sandals",
      price: 849,
      image: sandal5,
      details: "Minimalist style with comfort sole",
      description: "Clean white sandals with minimalist design and ergonomic comfort sole. Perfect for everyday summer wear.",
      rating: 4.1,
      sizes: [4, 5, 6, 7, 8],
      colors: ["White"],
      images: [sandal5, sandal1],
      category: "Women > Footwear > Sandals"
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

  return (
    <div className="ws-sandals-container">
      <header className="ws-sandals-header">
        <h1>Women's Sandals Collection</h1>
        <p>Step out in comfort and style with our latest range</p>
      </header>

      <div className="ws-sandals-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="ws-sandals-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="ws-sandals-image"
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
              <div className="ws-sandals-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="ws-price">₹{product.price}</span>
                    {product.oldPrice && (
                      <span className="old-price">₹{product.oldPrice}</span>
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
                <p className="ws-desc">{product.details}</p>
                <div className="size-selector">
                  <label>Size:</label>
                  <select className="size-dropdown" id={`size-${product.id}`}>
                    {product.sizes.map(size => (
                      <option key={size} value={size}>UK {size}</option>
                    ))}
                  </select>
                </div>
                <div className="ws-actions">
                  <button 
                    className="ws-cart-btn"
                    onClick={() => handleAddToCart(product, document.getElementById(`size-${product.id}`).value)}
                  >
                    Add to Cart
                  </button>
                  <button className="ws-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Sandals;