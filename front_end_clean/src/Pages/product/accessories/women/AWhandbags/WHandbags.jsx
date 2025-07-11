import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './wHandbags.css';

import handbag1 from './wHandbags (1).webp';
import handbag2 from './wHandbags (2).webp';

const WHandbags = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 2401,
      name: 'Classic Brown Leather Handbag',
      price: 399,
      oldPrice: 499,
      image: handbag1,
      details: 'Spacious tote with metal accents',
      description: 'Premium brown leather handbag with ample storage space and elegant metal hardware. Features multiple compartments, including a zippered pocket and two side pockets. The adjustable shoulder strap allows for versatile carrying options.',
      rating: 4.6,
      colors: ["Brown"],
      materials: ["Genuine Leather", "Metal Hardware"],
      dimensions: "12\"H x 15\"W x 6\"D",
      images: [handbag1, handbag2],
      category: "Women > Accessories > Handbags > Totes"
    },
    {
      id: 2402,
      name: 'Soft Pink & White Satchel',
      price: 299,
      image: handbag2,
      details: 'Pastel design with gold zipper finish',
      description: 'Charming pastel satchel with a structured silhouette and gold-tone zipper accents. Made from durable vegan leather with a soft-touch finish. Features a top zipper closure, interior slip pockets, and an adjustable crossbody strap.',
      rating: 4.4,
      colors: ["Pink", "White"],
      materials: ["Vegan Leather", "Metal Zippers"],
      dimensions: "10\"H x 12\"W x 5\"D",
      images: [handbag2, handbag1],
      category: "Women > Accessories > Handbags > Satchels"
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
    <div className="whandbags-container">
      <header className="whandbags-header">
        <h1 className="store-title">CARDINALIS</h1>
        <h2>Women's Handbags</h2>
        <p>Elegant and functional bags for every occasion</p>
      </header>

      <div className="whandbags-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="whandbags-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="whandbags-image"
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
              <div className="whandbags-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="whandbags-price">₹{product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                      <span className="old-price">₹{product.oldPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="rating">
                    {renderStars(product.rating)}
                    <span className="rating-value">({product.rating})</span>
                  </div>
                </div>
                <p className="whandbags-desc">{product.details}</p>
                <div className="whandbags-actions">
                  <button 
                    className="whandbags-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <button className="whandbags-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default WHandbags;