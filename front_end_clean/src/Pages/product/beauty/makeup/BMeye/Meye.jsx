import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './Meye.css';

import meye1 from './eye (1).webp';
import meye2 from './eye (2).webp';
import meye3 from './eye (3).webp';

const Meye = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 1901,
      name: 'Intense Black Eye Kajal',
      price: 1,
      oldPrice: 199,
      image: meye1,
      details: 'Long-lasting waterproof kajal for bold eyes',
      description: 'Highly pigmented black kajal with smudge-proof and waterproof formula. Enriched with almond oil for smooth application without irritation.',
      rating: 4.6,
      variants: ["Single", "Twin Pack"],
      colors: ["Black"],
      images: [meye1, meye2],
      category: "Beauty > Makeup > Eyes"
    },
    {
      id: 1902,
      name: 'Glossy Red Nail Polish',
      price: 149,
      image: meye2,
      details: 'High-shine finish, chip-resistant formula',
      description: 'Vibrant red nail polish with glossy finish and long-lasting formula. Dries quickly and resists chipping for up to 7 days of wear.',
      rating: 4.3,
      variants: ["8ml", "12ml"],
      colors: ["Ruby Red"],
      images: [meye2, meye3],
      category: "Beauty > Makeup > Nails"
    },
    {
      id: 1903,
      name: 'Nude Matte Nail Polish',
      price: 79,
      oldPrice: 99,
      image: meye3,
      details: 'Smooth matte texture with subtle elegance',
      description: 'Sophisticated nude matte nail polish with velvety finish. Provides full coverage in two coats and resists fading for professional-looking nails.',
      rating: 4.5,
      variants: ["8ml", "12ml"],
      colors: ["Classic Nude"],
      images: [meye3, meye1],
      category: "Beauty > Makeup > Nails"
    }
  ];

  const handleAddToCart = (product, selectedVariant) => {
    addToCart({
      id: `${product.id}-${selectedVariant}`,
      name: `${product.name} (${selectedVariant})`,
      price: product.price,
      image: product.image,
      quantity: 1,
      variant: selectedVariant
    });
    
    toast.success(`${product.name} (${selectedVariant}) added to cart!`, {
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
    <div className="meye-container">
      <header className="meye-header">
        <h1>Makeup - Eyes & Nails</h1>
        <p>Enhance your beauty with our premium eye and nail products</p>
      </header>

      <div className="meye-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="meye-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="meye-image"
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
              <div className="meye-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="meye-price">₹{product.price.toFixed(2)}</span>
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
                <p className="meye-desc">{product.details}</p>
                <div className="variant-selector">
                  <label>Option:</label>
                  <select className="variant-dropdown" id={`variant-${product.id}`}>
                    {product.variants.map(variant => (
                      <option key={variant} value={variant}>{variant}</option>
                    ))}
                  </select>
                </div>
                <div className="meye-actions">
                  <button 
                    className="meye-cart-btn"
                    onClick={() => handleAddToCart(product, document.getElementById(`variant-${product.id}`).value)}
                  >
                    Add to Cart
                  </button>
                  <button className="meye-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Meye;