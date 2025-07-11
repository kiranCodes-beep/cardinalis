import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './glassring.css';

import glasses from './glassring (1).webp';  
import ring from './glassring (2).webp';  

const Glassring = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 2301,
      name: 'Sleek Black Sunglasses',
      price: 1999,
      oldPrice: 2499,
      image: glasses,
      details: 'UV protection, unisex aviator style',
      description: 'Classic aviator sunglasses with 100% UV protection lenses. Features lightweight metal frames with adjustable nose pads for comfortable all-day wear. Includes microfiber cleaning pouch.',
      rating: 4.5,
      variants: ["One Size"],
      colors: ["Black", "Gunmetal"],
      materials: ["Metal Frame", "Polycarbonate Lenses"],
      features: ["UV400 Protection", "Polarized", "Anti-Reflective"],
      images: [glasses],
      category: "Accessories > Eyewear > Sunglasses > Aviator"
    },
    {
      id: 2302,
      name: 'Elegant Silver Ring',
      price: 1599,
      image: ring,
      details: 'Adjustable band with polished finish',
      description: 'Minimalist silver-toned ring with smooth polished finish. Features an adjustable band that fits most finger sizes (5-9). Made from hypoallergenic stainless steel that resists tarnishing.',
      rating: 4.3,
      sizes: ["5", "6", "7", "8", "9"],
      colors: ["Silver"],
      materials: ["Stainless Steel"],
      images: [ring],
      category: "Accessories > Jewelry > Rings > Minimalist"
    }
  ];

  const handleAddToCart = (product, selectedVariant) => {
    addToCart({
      id: `${product.id}-${selectedVariant}`,
      name: `${product.name} ${product.sizes ? `(Size ${selectedVariant})` : ''}`,
      price: product.price,
      image: product.image,
      quantity: 1,
      variant: selectedVariant
    });
    
    toast.success(`${product.name} ${product.sizes ? `(Size ${selectedVariant})` : ''} added to cart!`, {
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

  const getVariants = (product) => {
    return product.sizes || product.variants;
  };

  const getVariantLabel = (product) => {
    return product.sizes ? "Size" : "Variant";
  };

  return (
    <div className="glassring-container">
      <header className="glassring-header">
        <h1 className="store-title">CARDINALIS</h1>
        <h2>Glasses & Rings</h2>
        <p>Trendy accessories to elevate your look</p>
      </header>

      <div className="glassring-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;
          const variants = getVariants(product);
          const variantLabel = getVariantLabel(product);

          return (
            <article key={product.id} className="glassring-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="glassring-image"
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
              <div className="glassring-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="glassring-price">₹{product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                      <span className="old-price">₹{product.oldPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="rating">
                    {renderStars(product.rating)}
                    <span className="rating-value">({product.rating})</span>
                  </div>
                </div>
                <p className="glassring-desc">{product.details}</p>
                {variants && (
                  <div className="variant-selector">
                    <label>{variantLabel}:</label>
                    <select className="variant-dropdown" id={`variant-${product.id}`}>
                      {variants.map(variant => (
                        <option key={variant} value={variant}>{variant}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="glassring-actions">
                  <button 
                    className="glassring-cart-btn"
                    onClick={() => handleAddToCart(
                      product, 
                      variants ? document.getElementById(`variant-${product.id}`).value : 'Standard'
                    )}
                  >
                    Add to Cart
                  </button>
                  <button className="glassring-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Glassring;