import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './fsneakers.css';

import sneaker1 from './sneakers (1).webp';
import sneaker2 from './sneakers (2).webp';
import sneaker3 from './sneakers (3).webp';
import sneaker4 from './sneakers (4).webp';

const Fsneakers = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 1101,
      name: "Classic White Sneakers",
      price: 1799,
      oldPrice: 1999,
      image: sneaker1,
      details: "Low-top leather with soft cushioning",
      description: "Timeless white sneakers crafted from premium leather with advanced cushioning technology. Features a low-top design and flexible rubber sole for all-day comfort.",
      rating: 4.6,
      sizes: ["EU 36", "EU 37", "EU 38", "EU 39", "EU 40"],
      colors: ["White"],
      images: [sneaker1, sneaker2],
      category: "Women > Footwear > Sneakers"
    },
    {
      id: 1102,
      name: "Beige Comfort Walkers",
      price: 1599,
      image: sneaker2,
      details: "Light brown tone, all-day support",
      description: "Elegant beige sneakers designed for maximum comfort with arch support and shock-absorbing soles. Perfect for long walks and everyday wear.",
      rating: 4.4,
      sizes: ["EU 35", "EU 36", "EU 37", "EU 38"],
      colors: ["Beige"],
      images: [sneaker2, sneaker3],
      category: "Women > Footwear > Comfort"
    },
    {
      id: 1103,
      name: "Monochrome Street Style",
      price: 1899,
      oldPrice: 2199,
      image: sneaker3,
      details: "Black-white contrast with sleek fit",
      description: "Fashion-forward monochrome sneakers with a sleek silhouette. Features breathable mesh panels and a cushioned footbed for urban comfort.",
      rating: 4.7,
      sizes: ["EU 37", "EU 38", "EU 39", "EU 40"],
      colors: ["Black", "White"],
      images: [sneaker3, sneaker4],
      category: "Women > Footwear > Streetwear"
    },
    {
      id: 1104,
      name: "White-Olive Trainers",
      price: 1699,
      image: sneaker4,
      details: "Sporty edge with durable sole",
      description: "Versatile white and olive trainers with a sporty aesthetic. Built with a durable rubber sole and lightweight construction for active lifestyles.",
      rating: 4.3,
      sizes: ["EU 36", "EU 37", "EU 38", "EU 39", "EU 40"],
      colors: ["White", "Olive"],
      images: [sneaker4, sneaker1],
      category: "Women > Footwear > Athletic"
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
    <div className="fw-sneakers-container">
      <header className="fw-sneakers-header">
        <h1 className="store-title">CARDINALIS</h1>
        <h2>Women's Sneakers Collection</h2>
        <p>Stylish comfort for every step</p>
      </header>

      <div className="fw-sneakers-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="fw-sneakers-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="fw-sneakers-image"
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
              <div className="fw-sneakers-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="fw-price">₹{product.price}</span>
                    {product.oldPrice && (
                      <span className="old-price">₹{product.oldPrice}</span>
                    )}
                  </div>
                  <div className="rating">
                    {renderStars(product.rating)}
                    <span className="rating-value">({product.rating})</span>
                  </div>
                </div>
                <p className="fw-desc">{product.details}</p>
                <div className="size-selector">
                  <label>Size:</label>
                  <select className="size-dropdown" id={`size-${product.id}`}>
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div className="fw-actions">
                  <button 
                    className="fw-cart-btn"
                    onClick={() => handleAddToCart(
                      product, 
                      document.getElementById(`size-${product.id}`).value
                    )}
                  >
                    Add to Cart
                  </button>
                  <button className="fw-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Fsneakers;