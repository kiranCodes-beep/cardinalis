import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './belt.css';

import belt1 from './belts (1).webp';
import belt2 from './belts (2).webp';

const Belt = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 2201,
      name: 'Classic Black Leather Belt',
      price: 199,
      oldPrice: 299,
      image: belt1,
      details: 'Sleek design, ideal for formal wear',
      description: 'Premium black leather belt with polished silver buckle. Made from genuine leather with reinforced stitching for durability. Adjustable sizing fits waist sizes 30-42 inches.',
      rating: 4.6,
      sizes: ["S (30-32\")", "M (32-34\")", "L (34-36\")", "XL (36-38\")", "XXL (38-40\")", "XXXL (40-42\")"],
      colors: ["Black"],
      materials: ["Genuine Leather", "Metal Buckle"],
      images: [belt1, belt2],
      category: "Men > Accessories > Belts > Formal"
    },
    {
      id: 2202,
      name: 'Brown Textured Belt',
      price: 149,
      image: belt2,
      details: 'Durable material with rustic finish',
      description: 'Distressed brown leather belt with antique brass buckle. Features a textured finish that develops a unique patina over time. Suitable for both casual and business casual outfits.',
      rating: 4.4,
      sizes: ["S (30-32\")", "M (32-34\")", "L (34-36\")", "XL (36-38\")"],
      colors: ["Brown"],
      materials: ["Genuine Leather", "Brass Buckle"],
      images: [belt2, belt1],
      category: "Men > Accessories > Belts > Casual"
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
    <div className="belts-container">
      <header className="belts-header">
        <h1 className="store-title">CARDINALIS</h1>
        <h2>Men's Belts</h2>
        <p>Stylish leather belts to elevate your outfit</p>
      </header>

      <div className="belts-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="belts-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="belts-image"
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
              <div className="belts-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="belts-price">₹{product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                      <span className="old-price">₹{product.oldPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="rating">
                    {renderStars(product.rating)}
                    <span className="rating-value">({product.rating})</span>
                  </div>
                </div>
                <p className="belts-desc">{product.details}</p>
                <div className="size-selector">
                  <label>Size:</label>
                  <select className="size-dropdown" id={`size-${product.id}`}>
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div className="belts-actions">
                  <button 
                    className="belts-cart-btn"
                    onClick={() => handleAddToCart(
                      product, 
                      document.getElementById(`size-${product.id}`).value
                    )}
                  >
                    Add to Cart
                  </button>
                  <button className="belts-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Belt;