import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './dresses.css';

import dress1 from './dresses1.webp';
import dress2 from './dresses2.webp';
import dress3 from './dresses3.webp';
import dress4 from './dresses4.webp';

const Dresses = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 601,
      name: "Black Party Dress",
      price: 329,
      oldPrice: 399,
      image: dress1,
      details: "Satin finish, flared",
      description: "Elegant black party dress with satin finish and flared skirt. Features a fitted bodice and comfortable stretch fabric for all-night wear.",
      rating: 4.5,
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Black"],
      images: [dress1, dress2],
      category: "Women > Dresses > Evening"
    },
    {
      id: 602,
      name: "Classic Black Frock",
      price: 289,
      image: dress2,
      details: "Cotton blend, sleeveless",
      description: "Versatile black frock made from breathable cotton blend. Simple yet sophisticated design perfect for both casual and formal occasions.",
      rating: 4.3,
      sizes: ["S", "M", "L"],
      colors: ["Black"],
      images: [dress2, dress3],
      category: "Women > Dresses > Casual"
    },
    {
      id: 603,
      name: "Light Green Princess Dress",
      price: 359,
      oldPrice: 459,
      image: dress3,
      details: "Tulle layers, floral accents",
      description: "Romantic princess-style dress with multiple tulle layers and delicate floral accents. Features a sweetheart neckline and fitted bodice.",
      rating: 4.7,
      sizes: ["XS", "S", "M", "L"],
      colors: ["Light Green"],
      images: [dress3, dress4],
      category: "Women > Dresses > Formal"
    },
    {
      id: 604,
      name: "Classic Blue Frock",
      price: 300,
      image: dress4,
      details: "Cotton blend, sleeve",
      description: "Timeless blue frock with short sleeves and A-line silhouette. Made from comfortable cotton blend fabric with subtle stretch.",
      rating: 4.3,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Blue"],
      images: [dress4, dress1],
      category: "Women > Dresses > Casual"
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
    <div className="dresses-container">
      <header className="dresses-header">
        <h1 className="store-title">CARDINALIS</h1>
        <h2>Women's Dresses Collection</h2>
        <p>Elegant styles for every occasion</p>
      </header>

      <div className="dresses-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <div key={product.id} className="dress-card">
              <div className="dress-image-container">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="dress-image"
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
              <div className="dress-info">
                <h2 className="dress-name">{product.name}</h2>
                <div className="price-container">
                  <span className="dress-price">₹{product.price.toFixed(2)}</span>
                  
                  {product.oldPrice && (
                    <span className="old-price">₹{product.oldPrice.toFixed(2)}</span>
                  )}
                </div>
                <div className="dress-rating">
                  {renderStars(product.rating)}
                  <span className="rating-value">({product.rating})</span>
                </div>
                <p className="dress-details">{product.details}</p>
                <div className="size-selector">
                  <label>Size:</label>
                  <select className="size-dropdown" id={`size-${product.id}`}>
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(
                    product, 
                    document.getElementById(`size-${product.id}`).value
                  )}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dresses;