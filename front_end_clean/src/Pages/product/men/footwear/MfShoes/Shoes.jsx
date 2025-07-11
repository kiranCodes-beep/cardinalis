import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './shoes.css';

import shoes1 from './shoes1.webp';
import shoes2 from './shoes2.webp';
import shoes3 from './shoes3.webp';

const Shoes = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 201,
      name: "Classic White Sneakers",
      price: 899,
      oldPrice: 1099,
      image: shoes1,
      details: "Timeless design with cushioned insole",
      description: "Iconic white sneakers with premium leather accents and memory foam footbed. Features a vulcanized rubber sole for durability and comfort.",
      rating: 4.7,
      sizes: [7, 8, 9, 10, 11, 12],
      images: [shoes1, shoes2],
      category: "Men > Footwear > Sneakers"
    },
    {
      id: 202,
      name: "Premium Leather Loafers",
      price: 1299,
      image: shoes2,
      details: "Handcrafted Italian leather",
      description: "Luxury loafers made from full-grain Italian leather with a soft leather lining. Features a cushioned insole and flexible rubber sole.",
      rating: 4.9,
      sizes: [7, 8, 9, 10, 11],
      images: [shoes2, shoes3],
      category: "Men > Footwear > Loafers"
    },
    {
      id: 203,
      name: "Sport Running Shoes",
      price: 1099,
      oldPrice: 1299,
      image: shoes3,
      details: "Lightweight with responsive cushioning",
      description: "Performance running shoes with breathable mesh upper and responsive foam midsole. Engineered for optimal support and energy return.",
      rating: 4.5,
      sizes: [8, 9, 10, 11, 12],
      images: [shoes3, shoes1],
      category: "Men > Footwear > Athletic"
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
    <div className="mw-shoes-container">
      <header className="mw-shoes-header">
        <h1>Men's Footwear Collection</h1>
        <p>Step out in style with our premium shoes</p>
      </header>

      <div className="mw-shoes-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="mw-shoes-card">
              <div className="image-container">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="mw-shoes-image"
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
              <div className="mw-shoes-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="mw-price">₹{product.price.toFixed(2)}</span>
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
                <p className="mw-desc">{product.details}</p>
                <div className="size-selector">
                  <label>Size:</label>
                  <select className="size-dropdown" id={`size-${product.id}`}>
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div className="mw-actions">
                  <button 
                    className="mw-cart-btn"
                    onClick={() => handleAddToCart(product, document.getElementById(`size-${product.id}`).value)}
                  >
                    Add to Cart
                  </button>
                  <button className="mw-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Shoes;