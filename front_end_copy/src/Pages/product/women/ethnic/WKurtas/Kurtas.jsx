import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './kurtas.css';

import kurtaRed from './kurtas1.webp';
import kurtaPink from './kurtas2.webp';
import kurtaViolet from './kurtas3.webp';
import kurtaDarkRed from './kurtas4.webp';
import kurtaGreen from './kurtas5.webp';

const Kurtas = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 701,
      name: "Classic Red Kurta",
      price: 1199,
      oldPrice: 1499,
      image: kurtaRed,
      details: "Cotton silk, side slits, mandarin collar",
      description: "Premium cotton silk kurta with elegant side slits and traditional mandarin collar. Perfect for festive occasions and formal gatherings.",
      rating: 4.6,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Red"],
      images: [kurtaRed, kurtaPink],
      category: "Men > Ethnic > Kurtas"
    },
    {
      id: 702,
      name: "Pastel Pink Kurta",
      price: 999,
      image: kurtaPink,
      details: "Linen blend, roll-up sleeves",
      description: "Lightweight linen blend kurta with comfortable roll-up sleeves. Ideal for summer weddings and casual outings.",
      rating: 4.2,
      sizes: ["M", "L", "XL"],
      colors: ["Pink"],
      images: [kurtaPink, kurtaViolet],
      category: "Men > Ethnic > Kurtas"
    },
    {
      id: 703,
      name: "Elegant Violet Kurta",
      price: 1099,
      oldPrice: 129.99,
      image: kurtaViolet,
      details: "Viscose rayon, contrast piping",
      description: "Stylish viscose rayon kurta with elegant contrast piping details. Features a straight fit and subtle embroidery.",
      rating: 4.8,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Violet"],
      images: [kurtaViolet, kurtaDarkRed],
      category: "Men > Ethnic > Kurtas"
    },
    {
      id: 704,
      name: "Deep Maroon Kurta",
      price: 1299,
      image: kurtaDarkRed,
      details: "Festive wear, embroidered placket",
      description: "Luxurious maroon kurta with intricate embroidered placket. Made from premium fabric with a comfortable fit.",
      rating: 4.4,
      sizes: ["L", "XL", "XXL"],
      colors: ["Maroon"],
      images: [kurtaDarkRed, kurtaGreen],
      category: "Men > Ethnic > Kurtas"
    },
    {
      id: 705,
      name: "Forest Green Kurta",
      price: 1050,
      image: kurtaGreen,
      details: "Pure cotton, buttoned cuffs",
      description: "Breathable pure cotton kurta with buttoned cuffs and traditional Indian motifs. Perfect for daily wear and casual occasions.",
      rating: 4.1,
      sizes: ["S", "M", "L"],
      colors: ["Green"],
      images: [kurtaGreen, kurtaRed],
      category: "Men > Ethnic > Kurtas"
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
    <div className="mw-kurta-container">
      <header className="mw-kurta-header">
        <h1>Men's Kurta Collection</h1>
        <p>Elegant styles for every festive and casual occasion</p>
      </header>

      <div className="mw-kurta-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="mw-kurta-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="mw-kurta-image"
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
              <div className="mw-kurta-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="mw-price">₹{product.price.toFixed(2)}</span>
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
                    onClick={() => handleAddToCart(product, document.getElementById(`size-${product.id}`).value)}
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

export default Kurtas;