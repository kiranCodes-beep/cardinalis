import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './snickers.css';

import sneaker1 from './snickers1.webp';
import sneaker2 from './snickers2.webp';
import sneaker3 from './snickers3.webp';
import sneaker4 from './snickers4.webp';

const Snickers = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 501,
      name: "Classic White Sneakers",
      price: 899,
      oldPrice: 1099,
      image: sneaker1,
      details: "Timeless design with cushioned insole",
      description: "Iconic white sneakers with premium leather construction and memory foam footbed. Features a vulcanized rubber sole for durability and all-day comfort.",
      features: ["Premium leather", "Rubber outsole", "Breathable lining"],
      rating: 4.7,
      sizes: [7, 8, 9, 10, 11],
      colors: ["White", "Black", "Navy"],
      images: [sneaker1, sneaker2],
      category: "Men > Footwear > Sneakers"
    },
    {
      id: 502,
      name: "Retro Running Shoes",
      price: 1099,
      image: sneaker2,
      details: "Vintage-inspired performance sneakers",
      description: "Throwback running shoes with modern comfort technology. Features a cushioned midsole for impact absorption and a textile upper for breathability.",
      features: ["Cushioned midsole", "Textile upper", "Padded collar"],
      rating: 4.5,
      sizes: [8, 9, 10, 11, 12],
      colors: ["Black/Red", "White/Blue", "Gray/Orange"],
      images: [sneaker2, sneaker3],
      category: "Men > Footwear > Sneakers"
    },
    {
      id: 503,
      name: "Minimalist Street Sneakers",
      price: 799,
      oldPrice: 999,
      image: sneaker3,
      details: "Sleek low-profile design",
      description: "Ultra-lightweight sneakers with a flexible sole for natural movement. The slip-on design provides convenience while maintaining a secure fit.",
      features: ["Lightweight construction", "Flexible sole", "Slip-on style"],
      rating: 4.3,
      sizes: [7, 8, 9, 10],
      colors: ["Black", "White", "Beige"],
      images: [sneaker3, sneaker4],
      category: "Men > Footwear > Sneakers"
    },
    {
      id: 504,
      name: "High-Top Basketball Sneakers",
      price: 1299,
      image: sneaker4,
      details: "Ankle support with responsive cushioning",
      description: "Performance basketball sneakers with high-top design for ankle support. Features advanced shock absorption technology and a durable herringbone outsole for superior traction.",
      features: ["High-top design", "Shock absorption", "Durable outsole"],
      rating: 4.8,
      sizes: [8, 9, 10, 11, 12, 13],
      colors: ["Black/White", "Red/Black", "Blue/White"],
      images: [sneaker4, sneaker1],
      category: "Men > Footwear > Sneakers"
    }
  ];

  const handleAddToCart = (product, selectedSize, selectedColor) => {
    addToCart({
      id: `${product.id}-${selectedSize}-${selectedColor.replace('/', '-')}`,
      name: `${product.name} (Size ${selectedSize}, ${selectedColor})`,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: selectedSize,
      color: selectedColor
    });
    
    toast.success(`${product.name} (Size ${selectedSize}, ${selectedColor}) added to cart!`, {
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
    <div className="snk-container">
      <header className="snk-header">
        <h1>Sneakers Collection</h1>
        <p>Performance meets street style</p>
      </header>

      <div className="snk-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="snk-card">
              <div className="snk-image-container">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="snk-product-image"
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
                <span className="snk-badge">New</span>
              </div>
              
              <div className="snk-details">
                <h2>{product.name}</h2>
                
                <div className="snk-price-rating">
                  <div className="price-container">
                    <span className="snk-price">₹{product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                      <span className="old-price">₹{product.oldPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="snk-rating">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`snk-star ${i < Math.floor(product.rating) ? 'filled' : ''} ${
                          i === Math.floor(product.rating) && product.rating % 1 >= 0.5 ? 'half-filled' : ''
                        }`}
                      >
                        ★
                      </span>
                    ))}
                    <span>({product.rating})</span>
                  </div>
                </div>
                
                <p className="snk-description">{product.details}</p>
                
                <div className="snk-features">
                  <h3>Features:</h3>
                  <ul>
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="snk-options">
                  <div className="snk-colors">
                    <span>Colors: </span>
                    {product.colors.map((color, index) => (
                      <span 
                        key={index}
                        className="snk-color-chip"
                        style={{ 
                          backgroundColor: color.split('/')[0].toLowerCase(),
                          border: color.includes('/') ? `2px solid ${color.split('/')[1].toLowerCase()}` : 'none'
                        }}
                        title={color}
                      />
                    ))}
                  </div>
                  
                  <div className="snk-size-selector">
                    <label>Size:</label>
                    <select className="size-dropdown" id={`size-${product.id}`}>
                      {product.sizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="snk-actions">
                  <button 
                    className="snk-cart-btn"
                    onClick={() => handleAddToCart(
                      product, 
                      document.getElementById(`size-${product.id}`).value,
                      product.colors[0] // Default to first color
                    )}
                  >
                    Add to Cart
                  </button>
                  <button className="snk-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Snickers;