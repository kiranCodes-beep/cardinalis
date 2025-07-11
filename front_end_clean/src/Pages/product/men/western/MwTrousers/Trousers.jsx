import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './trousers.css';

import trousersA from './trousers1.webp';
import trousersB from './trousers2.webp';
import trousersC from './trousers3.webp';
import trousersD from './trousers4.webp';

const Trousers = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 401,
      name: "Classic Formal Trousers",
      price: 899,
      oldPrice: 1099,
      image: trousersA,
      details: "Premium wool blend for office wear",
      description: "High-quality wool blend trousers with perfect drape and crease resistance. Features side adjusters and belt loops for customizable fit.",
      rating: 4.7,
      images: [trousersA, trousersB],
      category: "Men > Western > Trousers"
    },
    {
      id: 402,
      name: "Slim Fit Chinos",
      price: 799,
      image: trousersB,
      details: "Versatile cotton twill in multiple colors",
      description: "Modern slim-fit chinos made from durable cotton twill. Perfect for both office and casual occasions with its clean silhouette.",
      rating: 4.5,
      images: [trousersB, trousersC],
      category: "Men > Western > Trousers"
    },
    {
      id: 403,
      name: "Linen Summer Trousers",
      price: 949,
      oldPrice: 1199,
      image: trousersC,
      details: "Breathable fabric for warm weather",
      description: "Lightweight linen trousers with relaxed fit and natural texture. Ideal for summer months with excellent breathability.",
      rating: 4.3,
      images: [trousersC, trousersD],
      category: "Men > Western > Trousers"
    },
    {
      id: 404,
      name: "Tailored Wool Pants",
      price: 1299,
      image: trousersD,
      details: "High-end fabric with perfect drape",
      description: "Premium tailored wool pants with subtle stretch for comfort. Features a clean front and back darts for superior fit.",
      rating: 4.8,
      images: [trousersD, trousersA],
      category: "Men > Western > Trousers"
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

  return (
    <div className="mw-trousers-container">
      <header className="mw-trousers-header">
        <h1>Men's Trousers Collection</h1>
        <p>Sophisticated styles for every occasion</p>
      </header>

      <div className="mw-trousers-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="mw-trousers-card">
              <div className="image-container">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="mw-trousers-image"
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
              <div className="mw-trousers-details">
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
                <div className="mw-actions">
                  <button 
                    className="mw-cart-btn"
                    onClick={() => handleAddToCart(product)}
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

export default Trousers;