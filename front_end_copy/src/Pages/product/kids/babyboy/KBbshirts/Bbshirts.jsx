import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './bbshirts.css';

import bbshirt1 from './bbshirts (1).webp';
import bbshirt2 from './bbshirts (2).webp';
import bbshirt3 from './bbshirts (3).webp';

const Bbshirts = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 1301,
      name: '3-Pack Blue Cotton Shirts',
      price: 299,
      oldPrice: 399,
      image: bbshirt1,
      details: 'Soft breathable cotton, button-up',
      description: 'Value pack of 3 comfortable blue cotton shirts for baby boys. Features easy button-up design and soft, breathable fabric perfect for sensitive skin.',
      rating: 4.8,
      sizes: ["0-3M", "3-6M", "6-12M", "12-18M", "18-24M", "2-3Y"],
      colors: ["Blue"],
      images: [bbshirt1, bbshirt2],
      category: "Kids > Boys > Clothing > Shirts"
    },
    {
      id: 1302,
      name: 'Light Blue Denim Shirt',
      price: 199,
      image: bbshirt2,
      details: 'Rolled sleeves, chest pocket',
      description: 'Adorable light blue denim shirt with rolled sleeves and functional chest pocket. Made from soft, lightweight denim for all-day comfort.',
      rating: 4.5,
      sizes: ["3-6M", "6-12M", "12-18M", "18-24M"],
      colors: ["Light Blue"],
      images: [bbshirt2, bbshirt3],
      category: "Kids > Boys > Clothing > Shirts"
    },
    {
      id: 1303,
      name: 'Classic Blue Checks Shirt',
      price: 149,
      oldPrice: 199,
      image: bbshirt3,
      details: 'Button down, checkered pattern',
      description: 'Stylish blue checkered button-down shirt for baby boys. Features a classic pattern and comfortable fit for both casual and dressy occasions.',
      rating: 4.6,
      sizes: ["6-12M", "12-18M", "18-24M", "2-3Y"],
      colors: ["Blue/White"],
      images: [bbshirt3, bbshirt1],
      category: "Kids > Boys > Clothing > Shirts"
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
    <div className="bbshirts-container">
      <header className="bbshirts-header">
        <h1>Baby Boy Shirts (0–3 Years)</h1>
        <p>Smart & soft shirts for your little man</p>
      </header>

      <div className="bbshirts-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="bbshirts-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="bbshirts-image"
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
              <div className="bbshirts-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="bbshirts-price">₹{product.price.toFixed(2)}</span>
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
                <p className="bbshirts-desc">{product.details}</p>
                <div className="size-selector">
                  <label>Size:</label>
                  <select className="size-dropdown" id={`size-${product.id}`}>
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div className="bbshirts-actions">
                  <button 
                    className="bbshirts-cart-btn"
                    onClick={() => handleAddToCart(product, document.getElementById(`size-${product.id}`).value)}
                  >
                    Add to Cart
                  </button>
                  <button className="bbshirts-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Bbshirts;