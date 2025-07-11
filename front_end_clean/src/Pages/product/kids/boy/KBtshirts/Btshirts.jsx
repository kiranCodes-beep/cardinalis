import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './btshirts.css';

import btshirt1 from './btshirt (1).webp';
import btshirt2 from './btshirt (2).webp';
import btshirt3 from './btshirt (3).webp';

const Btshirts = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 1701,
      name: 'Black & White Printed Tee',
      price: 199,
      oldPrice: 299,
      image: btshirt1,
      details: 'Cotton, round neck',
      description: 'Cool black and white graphic tee made from 100% soft cotton with a comfortable round neck. Features a fun print that withstands multiple washes without fading.',
      rating: 4.3,
      sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y", "13-14Y"],
      colors: ["Black", "White"],
      images: [btshirt1, btshirt2],
      category: "Boys > Clothing > T-Shirts > Graphic"
    },
    {
      id: 1702,
      name: 'Brown Solid T-Shirt',
      price: 149,
      image: btshirt2,
      details: 'Soft jersey fabric',
      description: 'Classic brown t-shirt crafted from premium jersey fabric that gets softer with each wash. Features reinforced seams and a tagless label for maximum comfort.',
      rating: 4.1,
      sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y"],
      colors: ["Brown"],
      images: [btshirt2, btshirt3],
      category: "Boys > Clothing > T-Shirts > Basic"
    },
    {
      id: 1703,
      name: 'Blue & Black Raglan Tee',
      price: 199,
      oldPrice: 299,
      image: btshirt3,
      details: 'Short sleeves, casual wear',
      description: 'Sporty raglan sleeve t-shirt in blue and black color blocking. Made from breathable cotton blend with stretch for active play. Features a crew neck and durable stitching.',
      rating: 4.5,
      sizes: ["5-6Y", "7-8Y", "9-10Y", "11-12Y", "13-14Y"],
      colors: ["Blue", "Black"],
      images: [btshirt3, btshirt1],
      category: "Boys > Clothing > T-Shirts > Athletic"
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
    <div className="btshirts-container">
      <header className="btshirts-header">
        <h1 className="store-title">CARDINALIS</h1>
        <h2>Boys T-Shirts (Ages 3–14)</h2>
        <p>Trendy and comfortable t-shirts for every day</p>
      </header>

      <div className="btshirts-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="btshirts-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="btshirts-image"
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
              <div className="btshirts-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="btshirts-price">₹{product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                      <span className="old-price">₹{product.oldPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="rating">
                    {renderStars(product.rating)}
                    <span className="rating-value">({product.rating})</span>
                  </div>
                </div>
                <p className="btshirts-desc">{product.details}</p>
                <div className="size-selector">
                  <label>Size:</label>
                  <select className="size-dropdown" id={`size-${product.id}`}>
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div className="btshirts-actions">
                  <button 
                    className="btshirts-cart-btn"
                    onClick={() => handleAddToCart(
                      product, 
                      document.getElementById(`size-${product.id}`).value
                    )}
                  >
                    Add to Cart
                  </button>
                  <button className="btshirts-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Btshirts;