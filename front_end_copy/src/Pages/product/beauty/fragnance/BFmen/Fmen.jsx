import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './fmen.css';

import fmen1 from './bfmen (1).webp';
import fmen2 from './bfmen (2).webp';
import fmen3 from './bfmen (3).webp';

const Fmen = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 1801,
      name: 'Bold Musk Eau De Parfum',
      price: 499,
      oldPrice: 599,
      image: fmen1,
      details: 'Long-lasting musky scent with spicy notes',
      description: 'Premium eau de parfum with a bold musk base complemented by warm spicy notes. Offers 8-10 hours of lasting fragrance with sophisticated character.',
      rating: 4.6,
      sizes: ["50ml", "100ml"],
      scents: ["Musk", "Spice"],
      images: [fmen1, fmen2],
      category: "Men > Grooming > Fragrance"
    },
    {
      id: 1802,
      name: 'Ocean Breeze Cologne',
      price: 399,
      image: fmen2,
      details: 'Fresh aquatic blend for everyday wear',
      description: 'Refreshing cologne with aquatic top notes and subtle citrus undertones. Perfect for daily wear with 6-8 hour longevity and moderate sillage.',
      rating: 4.4,
      sizes: ["50ml", "100ml"],
      scents: ["Aquatic", "Citrus"],
      images: [fmen2, fmen3],
      category: "Men > Grooming > Fragrance"
    },
    {
      id: 1803,
      name: 'Woody Intense Spray',
      price: 450,
      oldPrice: 550,
      image: fmen3,
      details: 'Earthy woody notes with a modern twist',
      description: 'Intense woody fragrance featuring sandalwood and patchouli base with modern amber accents. Long-lasting formula ideal for evening wear.',
      rating: 4.7,
      sizes: ["50ml", "100ml"],
      scents: ["Woody", "Amber"],
      images: [fmen3, fmen1],
      category: "Men > Grooming > Fragrance"
    }
  ];

  const handleAddToCart = (product, selectedSize) => {
    addToCart({
      id: `${product.id}-${selectedSize}`,
      name: `${product.name} (${selectedSize})`,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: selectedSize
    });
    
    toast.success(`${product.name} (${selectedSize}) added to cart!`, {
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
    <div className="fmen-container">
      <header className="fmen-header">
        <h1>Men's Fragrance Collection</h1>
        <p>Explore signature scents that define your presence</p>
      </header>

      <div className="fmen-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="fmen-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="fmen-image"
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
              <div className="fmen-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="fmen-price">₹{product.price.toFixed(2)}</span>
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
                <p className="fmen-desc">{product.details}</p>
                <div className="size-selector">
                  <label>Size:</label>
                  <select className="size-dropdown" id={`size-${product.id}`}>
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div className="fmen-actions">
                  <button 
                    className="fmen-cart-btn"
                    onClick={() => handleAddToCart(product, document.getElementById(`size-${product.id}`).value)}
                  >
                    Add to Cart
                  </button>
                  <button className="fmen-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Fmen;