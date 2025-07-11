import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './mlipnail.css';

import mlipnail1 from './lipnail (1).webp';
import mlipnail2 from './lipnail (2).webp';
import mlipnail3 from './lipnail (3).webp';

const Mlipnail = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 2001,
      name: 'Velvet Matte Lipstick',
      price: 99,
      oldPrice: 199,
      image: mlipnail1,
      details: 'Long-lasting, intense color payoff',
      description: 'Creamy matte lipstick with full coverage and comfortable wear. Enriched with vitamin E and jojoba oil for hydration that lasts up to 8 hours.',
      rating: 4.6,
      variants: ["Ruby Red", "Berry Wine", "Nude Beige", "Pink Blush"],
      sizes: ["3.5g"],
      images: [mlipnail1, mlipnail2],
      category: "Beauty > Makeup > Lips"
    },
    {
      id: 2002,
      name: 'High Shine Nail Color - Red',
      price: 499,
      image: mlipnail2,
      details: 'Glossy finish, chip-resistant',
      description: 'Professional-quality nail polish with high-shine finish and chip-resistant formula. Applies smoothly and dries quickly for salon-perfect nails at home.',
      rating: 4.4,
      variants: ["Classic Red", "Burgundy", "Coral"],
      sizes: ["10ml"],
      images: [mlipnail2, mlipnail3],
      category: "Beauty > Makeup > Nails"
    },
    {
      id: 2003,
      name: 'Nude Gel Nail Polish',
      price: 59,
      oldPrice: 69,
      image: mlipnail3,
      details: 'Salon finish, no UV needed',
      description: 'Gel-effect nail polish that delivers salon-quality shine without UV light. Long-wearing formula lasts up to 14 days with proper application.',
      rating: 4.5,
      variants: ["Soft Nude", "Warm Beige", "Rose Taupe"],
      sizes: ["10ml"],
      images: [mlipnail3, mlipnail1],
      category: "Beauty > Makeup > Nails"
    }
  ];

  const handleAddToCart = (product, selectedVariant) => {
    addToCart({
      id: `${product.id}-${selectedVariant.replace(/\s+/g, '-')}`,
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
    <div className="mlipnail-container">
      <header className="mlipnail-header">
        <h1>Makeup – Lip & Nail</h1>
        <p>Bold lips and perfect nails for every mood</p>
      </header>

      <div className="mlipnail-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="mlipnail-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="mlipnail-image"
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
              <div className="mlipnail-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="mlipnail-price">₹{product.price.toFixed(2)}</span>
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
                <p className="mlipnail-desc">{product.details}</p>
                <div className="variant-selector">
                  <label>Color:</label>
                  <select className="variant-dropdown" id={`variant-${product.id}`}>
                    {product.variants.map(variant => (
                      <option key={variant} value={variant}>{variant}</option>
                    ))}
                  </select>
                </div>
                <div className="mlipnail-actions">
                  <button 
                    className="mlipnail-cart-btn"
                    onClick={() => handleAddToCart(product, document.getElementById(`variant-${product.id}`).value)}
                  >
                    Add to Cart
                  </button>
                  <button className="mlipnail-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Mlipnail;