import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './wtrousers.css';

import trouser1 from './wtrousers (1).webp';
import trouser2 from './wtrousers (2).webp';
import trouser3 from './wtrousers (3).webp';
import trouser4 from './wtrousers (4).webp';
import trouser5 from './wtrousers (5).webp';

const Wtrousers = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 901,
      name: 'Classic Black Trousers',
      price: 649,
      oldPrice: 799,
      image: trouser1,
      details: 'Slim fit, stretchable cotton',
      description: 'Premium black trousers with a slim fit design and stretchable cotton fabric for all-day comfort. Perfect for both office and casual wear.',
      rating: 4.4,
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Black"],
      images: [trouser1, trouser2],
      category: "Women > Western > Trousers"
    },
    {
      id: 902,
      name: 'Elegant White Pleated Pants',
      price: 599,
      image: trouser2,
      details: 'High waist, tailored finish',
      description: 'Sophisticated white pleated pants with a high waist design and perfectly tailored finish. Made from premium polyester blend fabric.',
      rating: 4.6,
      sizes: ["S", "M", "L"],
      colors: ["White"],
      images: [trouser2, trouser3],
      category: "Women > Western > Trousers"
    },
    {
      id: 903,
      name: 'Warm Brown Formal Trousers',
      price: 699,
      oldPrice: 899,
      image: trouser3,
      details: 'Mid-rise, wool blend',
      description: 'Elegant brown formal trousers crafted from premium wool blend fabric. Features a mid-rise waist and straight leg silhouette.',
      rating: 4.2,
      sizes: ["M", "L", "XL"],
      colors: ["Brown"],
      images: [trouser3, trouser4],
      category: "Women > Western > Trousers"
    },
    {
      id: 904,
      name: 'Dusky Beige Wide-Leg Pants',
      price: 749,
      image: trouser4,
      details: 'Relaxed fit, soft touch',
      description: 'Stylish beige wide-leg pants with a relaxed fit and ultra-soft fabric. Perfect for creating effortless chic looks.',
      rating: 4.5,
      sizes: ["XS", "S", "M", "L"],
      colors: ["Beige"],
      images: [trouser4, trouser5],
      category: "Women > Western > Trousers"
    },
    {
      id: 905,
      name: 'White Cropped Cotton Trousers',
      price: 589,
      image: trouser5,
      details: 'Casual style, breathable fabric',
      description: 'Comfortable white cropped trousers made from 100% breathable cotton. Features a casual style perfect for summer outfits.',
      rating: 4.3,
      sizes: ["S", "M", "L", "XL"],
      colors: ["White"],
      images: [trouser5, trouser1],
      category: "Women > Western > Trousers"
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
    <div className="wtrousers-container">
      <header className="wtrousers-header">
        <h1>Women's Trousers Collection</h1>
        <p>Elegance and comfort in every step</p>
      </header>

      <div className="wtrousers-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="wtrousers-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="wtrousers-image"
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
              <div className="wtrousers-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="wtrousers-price">₹{product.price.toFixed(2)}</span>
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
                <p className="wtrousers-desc">{product.details}</p>
                <div className="size-selector">
                  <label>Size:</label>
                  <select className="size-dropdown" id={`size-${product.id}`}>
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div className="wtrousers-actions">
                  <button 
                    className="wtrousers-cart-btn"
                    onClick={() => handleAddToCart(product, document.getElementById(`size-${product.id}`).value)}
                  >
                    Add to Cart
                  </button>
                  <button className="wtrousers-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Wtrousers;