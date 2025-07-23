import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './gskirts.css';

import gskirt1 from './gskirts (1).webp';
import gskirt2 from './gskirts (2).webp';
import gskirt3 from './gskirts (3).webp';

const Gskirts = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 1701,
      name: 'Pink Frilly Skirt',
      price: 199,
      oldPrice: 299,
      image: gskirt1,
      details: 'Soft tulle, elastic waistband',
      description: 'Adorable pink tulle skirt with multiple layers of soft fabric and comfortable elastic waistband. Perfect for parties and special occasions.',
      rating: 4.5,
      sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
      colors: ["Pink"],
      images: [gskirt1, gskirt2],
      category: "Kids > Girls > Clothing > Skirts"
    },
    {
      id: 1702,
      name: 'Pink & White Pleated Skirt',
      price: 199,
      image: gskirt2,
      details: 'Pleated cotton blend, knee length',
      description: 'Stylish pleated skirt in pink and white color combination. Made from breathable cotton blend fabric with perfect knee-length design.',
      rating: 4.3,
      sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y"],
      colors: ["Pink/White"],
      images: [gskirt2, gskirt3],
      category: "Kids > Girls > Clothing > Skirts"
    },
    {
      id: 1703,
      name: 'Classic White Cotton Skirt',
      price: 199,
      oldPrice: 299,
      image: gskirt3,
      details: 'Breathable fabric, A-line cut',
      description: 'Versatile white cotton skirt with A-line silhouette. Features an elastic waistband and comfortable length for everyday wear.',
      rating: 4.4,
      sizes: ["5-6Y", "7-8Y", "9-10Y", "11-12Y", "13-14Y"],
      colors: ["White"],
      images: [gskirt3, gskirt1],
      category: "Kids > Girls > Clothing > Skirts"
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
    <div className="gskirt-container">
      <header className="gskirt-header">
        <h1>Girls Skirts (Ages 3–14)</h1>
        <p>Chic and comfy skirts for every mood</p>
      </header>

      <div className="gskirt-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="gskirt-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="gskirt-image"
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
              <div className="gskirt-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="gskirt-price">₹{product.price.toFixed(2)}</span>
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
                <p className="gskirt-desc">{product.details}</p>
                <div className="size-selector">
                  <label>Size:</label>
                  <select className="size-dropdown" id={`size-${product.id}`}>
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div className="gskirt-actions">
                  <button 
                    className="gskirt-cart-btn"
                    onClick={() => handleAddToCart(product, document.getElementById(`size-${product.id}`).value)}
                  >
                    Add to Cart
                  </button>
                  <button className="gskirt-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Gskirts;