import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './wtshirts.css';

import tshirt1 from './wtshirt (1).webp';
import tshirt2 from './wtshirt (2).webp';
import tshirt3 from './wtshirt (3).webp';
import tshirt4 from './wtshirt (4).webp';

const Wtshirts = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 1001,
      name: 'White & Black Contrast Tee',
      price: 499,
      oldPrice: 599,
      image: tshirt1,
      details: 'Crew neck, cotton blend',
      description: 'Stylish contrast t-shirt featuring white and black panels with a comfortable crew neckline. Made from premium cotton blend fabric for softness and durability.',
      rating: 4.2,
      sizes: ["XS", "S", "M", "L"],
      colors: ["White/Black"],
      images: [tshirt1, tshirt2],
      category: "Women > Western > T-Shirts"
    },
    {
      id: 1002,
      name: 'Red & Black Graphic T-Shirt',
      price: 599,
      image: tshirt2,
      details: 'Bold print, relaxed fit',
      description: 'Eye-catching graphic t-shirt with vibrant red and black design. Features a relaxed fit for maximum comfort and a modern streetwear look.',
      rating: 4.6,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Red/Black"],
      images: [tshirt2, tshirt3],
      category: "Women > Western > T-Shirts"
    },
    {
      id: 1003,
      name: 'Solid White Cotton Tee',
      price: 399,
      oldPrice: 499,
      image: tshirt3,
      details: '100% cotton, everyday wear',
      description: 'Essential white t-shirt made from 100% premium cotton. Perfect for layering or wearing alone, with a classic fit that flatters all body types.',
      rating: 4.4,
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["White"],
      images: [tshirt3, tshirt4],
      category: "Women > Western > T-Shirts"
    },
    {
      id: 1004,
      name: 'Light Blue Oversized Tee',
      price: 449,
      image: tshirt4,
      details: 'Soft jersey, oversized cut',
      description: 'Trendy oversized t-shirt in a soothing light blue shade. Made from ultra-soft jersey fabric with a relaxed, comfortable fit perfect for casual wear.',
      rating: 4.3,
      sizes: ["S", "M", "L"],
      colors: ["Light Blue"],
      images: [tshirt4, tshirt1],
      category: "Women > Western > T-Shirts"
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
    <div className="wtshirts-container">
      <header className="wtshirts-header">
        <h1>Women's T-Shirts</h1>
        <p>Casual and cool styles for every mood</p>
      </header>

      <div className="wtshirts-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="wtshirts-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="wtshirts-image"
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
              <div className="wtshirts-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="wtshirts-price">₹{product.price.toFixed(2)}</span>
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
                <p className="wtshirts-desc">{product.details}</p>
                <div className="size-selector">
                  <label>Size:</label>
                  <select className="size-dropdown" id={`size-${product.id}`}>
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div className="wtshirts-actions">
                  <button 
                    className="wtshirts-cart-btn"
                    onClick={() => handleAddToCart(product, document.getElementById(`size-${product.id}`).value)}
                  >
                    Add to Cart
                  </button>
                  <button className="wtshirts-wishlist-btn">♡</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Wtshirts;