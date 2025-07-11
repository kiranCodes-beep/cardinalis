import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './tshirts.css';

import tshirt1 from './t-shirts1.webp';
import tshirt2 from './t-shirts2.webp';
import tshirt3 from './t-shirts3.webp';
import tshirt4 from './t-shirts4.webp';
import tshirt5 from './t-shirts5.webp';

const Tshirts = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 101,
      name: "Classic White Tee",
      price: 299,
      oldPrice: 399,
      image: tshirt1,
      details: "100% premium cotton essential t-shirt",
      description: "Ultra-soft 100% cotton crewneck t-shirt with reinforced seams for durability. Perfect for layering or wearing alone.",
      rating: 4.8,
      images: [tshirt1, tshirt2],
      category: "Men > Western > T-Shirts"
    },
    {
      id: 102,
      name: "Black Graphic Tee",
      price: 349,
      image: tshirt2,
      details: "Softstyle with premium print technology",
      description: "Premium black t-shirt with high-quality graphic print that won't crack or fade. Features a comfortable relaxed fit.",
      rating: 4.6,
      images: [tshirt2, tshirt3],
      category: "Men > Western > T-Shirts"
    },
    {
      id: 103,
      name: "Striped Crewneck",
      price: 399,
      oldPrice: 499,
      image: tshirt3,
      details: "Breathable cotton-polyester blend",
      description: "Classic striped crewneck t-shirt with moisture-wicking technology. The perfect balance of comfort and style.",
      rating: 4.4,
      images: [tshirt3, tshirt4],
      category: "Men > Western > T-Shirts"
    },
    {
      id: 104,
      name: "V-Neck Basic",
      price: 299,
      image: tshirt4,
      details: "Lightweight for perfect layering",
      description: "Essential v-neck t-shirt made from lightweight combed cotton. Slightly longer in the body for better coverage.",
      rating: 4.3,
      images: [tshirt4, tshirt5],
      category: "Men > Western > T-Shirts"
    },
    {
      id: 105,
      name: "Pocket Tee",
      price: 399,
      oldPrice: 499,
      image: tshirt5,
      details: "Classic chest pocket design",
      description: "Timeless pocket t-shirt with reinforced stitching and a perfectly proportioned chest pocket. Medium weight fabric.",
      rating: 4.5,
      images: [tshirt5, tshirt1],
      category: "Men > Western > T-Shirts"
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
    <div className="mw-tshirts-container">
      <header className="mw-tshirts-header">
        <h1>Men's T-Shirts Collection</h1>
        <p>Essential styles for every wardrobe</p>
      </header>

      <div className="mw-tshirts-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="mw-tshirts-card">
              <div className="image-container">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="mw-tshirts-image"
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
              <div className="mw-tshirts-details">
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

export default Tshirts;