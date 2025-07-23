import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './fwomen.css';

import fwomen1 from './bfwomen (1).webp';
import fwomen2 from './bfwomen (2).webp';

const Fwomen = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 2001,
      name: 'Rose Bloom Eau De Parfum',
      price: 599,
      oldPrice: 699,
      image: fwomen1,
      details: 'Elegant floral fragrance for daily charm',
      description: 'A luxurious floral fragrance featuring top notes of bergamot and pear, heart notes of rose and peony, and base notes of musk and sandalwood. Perfect for daytime wear with long-lasting scent.',
      rating: 4.8,
      sizes: ["30ml", "50ml", "100ml"],
      scentTypes: ["Floral", "Fresh", "Fruity"],
      images: [fwomen1, fwomen2],
      category: "Women > Beauty > Fragrance > Eau De Parfum"
    },
    {
      id: 2002,
      name: 'Vanilla Mist Perfume Spray',
      price: 475,
      image: fwomen2,
      details: 'Warm vanilla and jasmine notes for evening wear',
      description: 'A sensual evening fragrance blending warm vanilla with jasmine and amber notes. Features a rich, long-lasting formula that develops beautifully throughout the night.',
      rating: 4.6,
      sizes: ["30ml", "50ml", "100ml"],
      scentTypes: ["Gourmand", "Floral", "Oriental"],
      images: [fwomen2, fwomen1],
      category: "Women > Beauty > Fragrance > Perfume"
    }
  ];

  const handleAddToCart = (product, selectedSize) => {
    addToCart({
      id: `${product.id}-${selectedSize}`,
      name: `${product.name} (${selectedSize})`,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: selectedSize
    });
    
    toast.success(`${product.name} (${selectedSize}) added to cart!`, {
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
    <div className="fwomen-container">
      <header className="fwomen-header">
        <h1 className="store-title">CARDINALIS</h1>
        <h2>Women's Fragrances</h2>
        <p>Enchanting scents that define elegance</p>
      </header>

      <div className="fwomen-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="fwomen-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="fwomen-image"
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
              <div className="fwomen-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="fwomen-price">₹{product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                      <span className="old-price">₹{product.oldPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="rating">
                    {renderStars(product.rating)}
                    <span className="rating-value">({product.rating})</span>
                  </div>
                </div>
                <p className="fwomen-desc">{product.details}</p>
                <div className="size-selector">
                  <label>Size:</label>
                  <select className="size-dropdown" id={`size-${product.id}`}>
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div className="fwomen-actions">
                  <button 
                    className="fwomen-cart-btn"
                    onClick={() => handleAddToCart(
                      product, 
                      document.getElementById(`size-${product.id}`).value
                    )}
                  >
                    Add to Cart
                  </button>
                  <button className="fwomen-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Fwomen;