import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './bjeans.css';

import bjean1 from './bjeans (1).webp';
import bjean2 from './bjeans (2).webp';
import bjean3 from './bjeans (3).webp';

const Bjeans = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 1501,
      name: 'White Slim Fit Jeans',
      price: 399,
      oldPrice: 499,
      image: bjean1,
      details: 'Stretchable cotton, slim fit',
      description: 'Stylish white jeans with stretchable cotton fabric for active boys. Features a modern slim fit design with reinforced knees for durability.',
      rating: 4.3,
      sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y", "13-14Y"],
      colors: ["White"],
      images: [bjean1, bjean2],
      category: "Kids > Boys > Clothing > Jeans"
    },
    {
      id: 1502,
      name: 'Classic Blue Jeans',
      price: 399,
      image: bjean2,
      details: 'Mid-rise, stone washed',
      description: 'Timeless blue jeans with authentic stone-washed finish. Mid-rise waist and comfortable fit perfect for everyday wear.',
      rating: 4.5,
      sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y"],
      colors: ["Blue"],
      images: [bjean2, bjean3],
      category: "Kids > Boys > Clothing > Jeans"
    },
    {
      id: 1503,
      name: 'Black Denim Trousers',
      price: 450,
      oldPrice: 599,
      image: bjean3,
      details: 'Regular fit, durable wear',
      description: 'Premium black denim trousers with regular fit and reinforced stitching. Resistant to wear and tear for active boys.',
      rating: 4.4,
      sizes: ["5-6Y", "7-8Y", "9-10Y", "11-12Y", "13-14Y"],
      colors: ["Black"],
      images: [bjean3, bjean1],
      category: "Kids > Boys > Clothing > Jeans"
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
    <div className="bjeans-container">
      <header className="bjeans-header">
        <h1>Boys Jeans (Ages 3–14)</h1>
        <p>Durable and stylish jeans for every adventure</p>
      </header>

      <div className="bjeans-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="bjeans-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="bjeans-image"
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
              <div className="bjeans-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="bjeans-price">₹{product.price.toFixed(2)}</span>
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
                <p className="bjeans-desc">{product.details}</p>
                <div className="size-selector">
                  <label>Size:</label>
                  <select className="size-dropdown" id={`size-${product.id}`}>
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div className="bjeans-actions">
                  <button 
                    className="bjeans-cart-btn"
                    onClick={() => handleAddToCart(product, document.getElementById(`size-${product.id}`).value)}
                  >
                    Add to Cart
                  </button>
                  <button className="bjeans-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Bjeans;