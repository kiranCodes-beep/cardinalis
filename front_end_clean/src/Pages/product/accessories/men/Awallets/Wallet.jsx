import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './wallet.css';

import walletBlack from './wallet (1).webp';
import walletBrown from './wallet (2).webp';

const Wallet = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 2101,
      name: 'Classic Black Leather Wallet',
      price: 199,
      oldPrice: 299,
      image: walletBlack,
      details: 'Genuine leather with multiple card slots',
      description: 'Premium black leather wallet featuring 8 card slots, 2 bill compartments, and a transparent ID window. Handcrafted with full-grain leather for durability.',
      rating: 4.6,
      colors: ["Black"],
      materials: ["Genuine Leather"],
      images: [walletBlack, walletBrown],
      category: "Accessories > Wallets > Men"
    },
    {
      id: 2102,
      name: 'Brown Bifold Wallet',
      price: 149,
      image: walletBrown,
      details: 'Slim design with RFID protection',
      description: 'Slim-profile brown bifold wallet with RFID blocking technology to protect your cards. Includes 6 card slots, 1 bill compartment, and a coin pocket.',
      rating: 4.4,
      colors: ["Brown"],
      materials: ["PU Leather"],
      images: [walletBrown, walletBlack],
      category: "Accessories > Wallets > Men"
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
    <div className="wallet-container">
      <header className="wallet-header">
        <h1>Men's Wallets</h1>
        <p>Stylish and durable wallets for everyday use</p>
      </header>

      <div className="wallet-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="wallet-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="wallet-image"
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
              <div className="wallet-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="wallet-price">₹{product.price.toFixed(2)}</span>
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
                <p className="wallet-desc">{product.details}</p>
                <div className="wallet-actions">
                  <button 
                    className="wallet-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <button className="wallet-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Wallet;