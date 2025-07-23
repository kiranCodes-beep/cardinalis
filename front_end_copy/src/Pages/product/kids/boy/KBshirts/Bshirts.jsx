import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './bshirts.css';

import bshirt1 from './bshirts (1).webp';
import bshirt2 from './bshirts (2).webp';
import bshirt3 from './bshirts (3).webp';

const Bshirts = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 1601,
      name: 'Sky Blue Casual Shirt',
      price: 299,
      oldPrice: 399,
      image: bshirt1,
      details: 'Cotton, full sleeves',
      description: 'Comfortable sky blue shirt made from 100% premium cotton with full sleeves. Features a classic cut with reinforced stitching for durability, perfect for school or casual outings.',
      rating: 4.2,
      sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y", "13-14Y"],
      colors: ["Sky Blue"],
      images: [bshirt1, bshirt2],
      category: "Boys > Clothing > Shirts > Casual"
    },
    {
      id: 1602,
      name: 'Skin Tone Formal Shirt',
      price: 350,
      image: bshirt2,
      details: 'Linen blend, slim fit',
      description: 'Elegant skin tone formal shirt crafted from breathable linen-cotton blend. Features a slim fit design with French cuffs and a structured collar, ideal for special occasions.',
      rating: 4.4,
      sizes: ["5-6Y", "7-8Y", "9-10Y", "11-12Y", "13-14Y"],
      colors: ["Beige"],
      images: [bshirt2, bshirt3],
      category: "Boys > Clothing > Shirts > Formal"
    },
    {
      id: 1603,
      name: 'White Collar Shirt',
      price: 299,
      oldPrice: 399,
      image: bshirt3,
      details: 'Poly cotton, easy iron',
      description: 'Crisp white shirt with a classic collar, made from easy-care poly-cotton blend that resists wrinkles. Features a regular fit with button-down collar and double-stitched seams.',
      rating: 4.1,
      sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y"],
      colors: ["White"],
      images: [bshirt3, bshirt1],
      category: "Boys > Clothing > Shirts > School"
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
    <div className="bshirts-container">
      <header className="bshirts-header">
        <h1 className="store-title">CARDINALIS</h1>
        <h2>Boys Shirts (Ages 3–14)</h2>
        <p>Smart and comfy shirts for growing boys</p>
      </header>

      <div className="bshirts-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="bshirts-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="bshirts-image"
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
              <div className="bshirts-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="bshirts-price">₹{product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                      <span className="old-price">₹{product.oldPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="rating">
                    {renderStars(product.rating)}
                    <span className="rating-value">({product.rating})</span>
                  </div>
                </div>
                <p className="bshirts-desc">{product.details}</p>
                <div className="size-selector">
                  <label>Size:</label>
                  <select className="size-dropdown" id={`size-${product.id}`}>
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div className="bshirts-actions">
                  <button 
                    className="bshirts-cart-btn"
                    onClick={() => handleAddToCart(
                      product, 
                      document.getElementById(`size-${product.id}`).value
                    )}
                  >
                    Add to Cart
                  </button>
                  <button className="bshirts-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Bshirts;