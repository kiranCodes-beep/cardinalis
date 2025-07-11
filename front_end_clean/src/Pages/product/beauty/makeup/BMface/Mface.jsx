import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './mface.css';

import mface1 from './face (1).webp';
import mface2 from './face (2).webp';
import mface3 from './face (3).webp';
import mface4 from './face (4).webp';

const Mface = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 2101,
      name: 'Herbal Refresh Facewash',
      price: 249,
      oldPrice: 599,
      image: mface1,
      details: 'Cleanses deeply, suitable for all skin types',
      description: 'Gentle yet effective facewash with natural herbal extracts that remove impurities without stripping skin. Formulated with aloe vera and tea tree oil to soothe and refresh all skin types.',
      rating: 4.6,
      sizes: ["100ml", "200ml"],
      skinTypes: ["All Skin Types"],
      ingredients: ["Aloe Vera", "Tea Tree Oil", "Chamomile"],
      images: [mface1, mface2],
      category: "Beauty > Skin Care > Cleansers > Face Wash"
    },
    {
      id: 2102,
      name: 'Pore Minimizing Primer',
      price: 99,
      image: mface2,
      details: 'Smooth base for flawless makeup',
      description: 'Silky primer that blurs pores and creates a smooth canvas for makeup application. Contains light-diffusing particles to give skin a perfected look with or without foundation.',
      rating: 4.4,
      sizes: ["30ml", "50ml"],
      skinTypes: ["Oily", "Combination"],
      ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid"],
      images: [mface2, mface3],
      category: "Beauty > Makeup > Face > Primer"
    },
    {
      id: 2103,
      name: 'Matte Finish Foundation',
      price: 199,
      oldPrice: 299,
      image: mface3,
      details: 'Medium to full coverage, long lasting',
      description: 'Oil-free foundation with buildable coverage that stays matte all day. Transfer-resistant formula won\'t clog pores and helps control shine for up to 12 hours.',
      rating: 4.5,
      shades: ["Fair", "Light", "Medium", "Tan", "Deep"],
      skinTypes: ["Oily", "Combination"],
      ingredients: ["Kaolin Clay", "Jojoba Oil", "Sunflower Seed Extract"],
      images: [mface3, mface4],
      category: "Beauty > Makeup > Face > Foundation"
    },
    {
      id: 2104,
      name: 'Compact Powder SPF 20',
      price: 179,
      image: mface4,
      details: 'Controls oil, evens out skin tone',
      description: 'Pressed powder with sun protection that mattifies and perfects skin. Provides light coverage while absorbing excess oil throughout the day. Includes a mirror and sponge applicator.',
      rating: 4.3,
      shades: ["Translucent", "Light", "Medium"],
      skinTypes: ["All Skin Types"],
      ingredients: ["Zinc Oxide", "Titanium Dioxide", "Rice Powder"],
      images: [mface4, mface1],
      category: "Beauty > Makeup > Face > Powder"
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
    if (product.shades) return product.shades;
    if (product.sizes) return product.sizes;
    return ["Standard"];
  };

  return (
    <div className="mface-container">
      <header className="mface-header">
        <h1 className="store-title">CARDINALIS</h1>
        <h2>Makeup - Face Care Products</h2>
        <p>Essential face products to prep, perfect & protect</p>
      </header>

      <div className="mface-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;
          const variants = getVariants(product);
          const variantType = product.shades ? "Shade" : product.sizes ? "Size" : "Variant";

          return (
            <article key={product.id} className="mface-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="mface-image"
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
              <div className="mface-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="mface-price">₹{product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                      <span className="old-price">₹{product.oldPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="rating">
                    {renderStars(product.rating)}
                    <span className="rating-value">({product.rating})</span>
                  </div>
                </div>
                <p className="mface-desc">{product.details}</p>
                <div className="variant-selector">
                  <label>{variantType}:</label>
                  <select className="variant-dropdown" id={`variant-${product.id}`}>
                    {variants.map(variant => (
                      <option key={variant} value={variant}>{variant}</option>
                    ))}
                  </select>
                </div>
                <div className="mface-actions">
                  <button 
                    className="mface-cart-btn"
                    onClick={() => handleAddToCart(
                      product, 
                      document.getElementById(`variant-${product.id}`).value
                    )}
                  >
                    Add to Cart
                  </button>
                  <button className="mface-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Mface;