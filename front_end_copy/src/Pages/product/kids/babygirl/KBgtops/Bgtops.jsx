import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './bgtops.css';

import bgtop1 from './bgtops (1).webp';
import bgtop2 from './bgtops (2).webp';
import bgtop3 from './bgtops (3).webp';

const Bgtops = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 1401,
      name: 'Sky Blue Ruffle Top',
      price: 1299,
      oldPrice: 1599,
      image: bgtop1,
      details: 'Soft cotton with ruffle sleeves',
      description: 'Adorable sky blue top with delicate ruffle sleeves, made from 100% soft cotton for your baby girl\'s comfort. Perfect for special occasions or everyday wear.',
      rating: 4.6,
      sizes: ["0-3M", "3-6M", "6-12M", "12-18M", "18-24M", "2-3Y"],
      colors: ["Sky Blue"],
      images: [bgtop1, bgtop2],
      category: "Kids > Girls > Clothing > Tops"
    },
    {
      id: 1402,
      name: 'Sunny Yellow Tee',
      price: 1049,
      image: bgtop2,
      details: 'Bright print, round neck, stretch fit',
      description: 'Cheerful yellow tee with fun prints, featuring a comfortable round neck and stretchy fabric that moves with your active toddler.',
      rating: 4.4,
      sizes: ["3-6M", "6-12M", "12-18M", "18-24M"],
      colors: ["Yellow"],
      images: [bgtop2, bgtop3],
      category: "Kids > Girls > Clothing > Tops"
    },
    {
      id: 1403,
      name: 'Denim Blue Blouse',
      price: 199,
      oldPrice: 299,
      image: bgtop3,
      details: 'Denim style with button front',
      description: 'Stylish denim-look blouse with functional button front, designed for easy dressing while keeping your little one fashionable.',
      rating: 4.7,
      sizes: ["6-12M", "12-18M", "18-24M", "2-3Y"],
      colors: ["Denim Blue"],
      images: [bgtop3, bgtop1],
      category: "Kids > Girls > Clothing > Tops"
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
    <div className="bgtops-container">
      <header className="bgtops-header">
        <h1>Baby Girl Tops (0–3 Years)</h1>
        <p>Soft, stylish tops for your little girl</p>
      </header>

      <div className="bgtops-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="bgtops-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="bgtops-image"
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
              <div className="bgtops-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="bgtops-price">₹{product.price.toFixed(2)}</span>
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
                <p className="bgtops-desc">{product.details}</p>
                <div className="size-selector">
                  <label>Size:</label>
                  <select className="size-dropdown" id={`size-${product.id}`}>
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div className="bgtops-actions">
                  <button 
                    className="bgtops-cart-btn"
                    onClick={() => handleAddToCart(product, document.getElementById(`size-${product.id}`).value)}
                  >
                    Add to Cart
                  </button>
                  <button className="bgtops-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Bgtops;