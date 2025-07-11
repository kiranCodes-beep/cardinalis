import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './gdresses.css';

import gdress1 from './gdresses (1).webp';
import gdress2 from './gdresses (2).webp';
import gdress3 from './gdresses (3).webp';

const Gdresses = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 1601,
      name: 'Black Party Dress',
      price: 399,
      oldPrice: 499,
      image: gdress1,
      details: 'Satin finish, flared',
      description: 'Elegant black party dress with satin finish and flared skirt. Features delicate lace trim and comfortable stretch lining for all-day wear.',
      rating: 4.6,
      sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y", "13-14Y"],
      colors: ["Black"],
      images: [gdress1, gdress2],
      category: "Kids > Girls > Clothing > Dresses"
    },
    {
      id: 1602,
      name: 'Classic Black Frock',
      price: 289,
      image: gdress2,
      details: 'Cotton blend, sleeveless',
      description: 'Timeless black frock made from breathable cotton blend. Simple yet sophisticated design perfect for both casual and formal occasions.',
      rating: 4.4,
      sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
      colors: ["Black"],
      images: [gdress2, gdress3],
      category: "Kids > Girls > Clothing > Dresses"
    },
    {
      id: 1603,
      name: 'Light Green Princess Dress',
      price: 399,
      oldPrice: 499,
      image: gdress3,
      details: 'Tulle layers, floral accents',
      description: 'Enchanting princess-style dress with multiple tulle layers and delicate floral accents. Features a sweetheart neckline and satin ribbon waistband.',
      rating: 4.8,
      sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y"],
      colors: ["Light Green"],
      images: [gdress3, gdress1],
      category: "Kids > Girls > Clothing > Dresses"
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
    <div className="gdresses-container">
      <header className="gdresses-header">
        <h1>Girls Dresses (Ages 3–14)</h1>
        <p>Charming dresses for every little fashionista</p>
      </header>

      <div className="gdresses-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="gdresses-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="gdresses-image"
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
              <div className="gdresses-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="gdresses-price">₹{product.price.toFixed(2)}</span>
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
                <p className="gdresses-desc">{product.details}</p>
                <div className="size-selector">
                  <label>Size:</label>
                  <select className="size-dropdown" id={`size-${product.id}`}>
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div className="gdresses-actions">
                  <button 
                    className="gdresses-cart-btn"
                    onClick={() => handleAddToCart(product, document.getElementById(`size-${product.id}`).value)}
                  >
                    Add to Cart
                  </button>
                  <button className="gdresses-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Gdresses;