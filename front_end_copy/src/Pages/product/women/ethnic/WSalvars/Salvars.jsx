import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './salvars.css';

import salvar1 from './Salvars (1).webp'; // brown-black
import salvar2 from './Salvars (2).webp'; // black-white
import salvar3 from './Salvars (3).webp'; // sand color
import salvar4 from './Salvars (4).webp'; // light pink

const Salvars = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 701,
      name: "Brown-Black Printed Salwar",
      price: 1299,
      oldPrice: 1599,
      image: salvar1,
      details: "Soft cotton blend with traditional print",
      description: "Comfortable cotton blend salwar with traditional prints. Perfect for casual wear with a kurta or tunic.",
      rating: 4.5,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Brown", "Black"],
      images: [salvar1, salvar2],
      category: "Women > Ethnic > Salwar"
    },
    {
      id: 702,
      name: "Black & White Salwar",
      price: 1399,
      image: salvar2,
      details: "Elegant monochrome with breathable fabric",
      description: "Stylish black and white salwar made from breathable fabric. Ideal for both casual and semi-formal occasions.",
      rating: 4.2,
      sizes: ["M", "L", "XL"],
      colors: ["Black", "White"],
      images: [salvar2, salvar3],
      category: "Women > Ethnic > Salwar"
    },
    {
      id: 703,
      name: "Sand Color Casual Salwar",
      price: 1199,
      oldPrice: 1499,
      image: salvar3,
      details: "Everyday wear with smooth finish",
      description: "Lightweight sand-colored salwar for everyday comfort. Features a smooth finish and comfortable fit.",
      rating: 4.0,
      sizes: ["S", "M", "L"],
      colors: ["Beige"],
      images: [salvar3, salvar4],
      category: "Women > Ethnic > Salwar"
    },
    {
      id: 704,
      name: "Light Pink Floral Salwar",
      price: 1499,
      image: salvar4,
      details: "Delicate floral print for festive occasions",
      description: "Elegant light pink salwar with delicate floral prints. Perfect for festive occasions and celebrations.",
      rating: 4.8,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Pink"],
      images: [salvar4, salvar1],
      category: "Women > Ethnic > Salwar"
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
    <div className="mw-salvars-container">
      <header className="mw-salvars-header">
        <h1 className="store-title">CARDINALIS</h1>
        <h2>Women's Salwar Collection</h2>
        <p>Chic and comfortable styles for every season</p>
      </header>

      <div className="mw-salvars-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="mw-salvars-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="mw-salvars-image"
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
              <div className="mw-salvars-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="mw-price">₹{product.price}</span>
                    {product.oldPrice && (
                      <span className="old-price">₹{product.oldPrice}</span>
                    )}
                  </div>
                  <div className="rating">
                    {renderStars(product.rating)}
                    <span className="rating-value">({product.rating})</span>
                  </div>
                </div>
                <p className="mw-desc">{product.details}</p>
                <div className="size-selector">
                  <label>Size:</label>
                  <select className="size-dropdown" id={`size-${product.id}`}>
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div className="mw-actions">
                  <button 
                    className="mw-cart-btn"
                    onClick={() => handleAddToCart(
                      product, 
                      document.getElementById(`size-${product.id}`).value
                    )}
                  >
                    Add to Cart
                  </button>
                  <button className="mw-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Salvars;