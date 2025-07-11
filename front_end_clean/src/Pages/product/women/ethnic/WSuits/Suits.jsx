import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../../Context/CartContext';
import { toast } from 'react-hot-toast';
import './suits.css';

import suit1 from './suits (1).webp';
import suit2 from './suits (2).webp';
import suit3 from './suits (3).webp';
import suit4 from './suits (4).webp';
import suit5 from './suits (5).webp';

const Suits = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 801,
      name: "White & Golden Anarkali Suit",
      price: 250,
      oldPrice: 350,
      image: suit1,
      details: "Embroidered design with silk blend fabric",
      description: "Elegant white and golden Anarkali suit with intricate embroidery and premium silk blend fabric. Perfect for weddings and festive occasions.",
      rating: 4.7,
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["White/Gold"],
      images: [suit1, suit2],
      category: "Women > Ethnic > Suits"
    },
    {
      id: 802,
      name: "Light Green Chikankari Suit",
      price: 280,
      image: suit2,
      details: "Pure cotton with intricate threadwork",
      description: "Traditional light green Chikankari suit featuring delicate hand embroidery on pure cotton fabric. Comfortable for all-day wear.",
      rating: 4.5,
      sizes: ["S", "M", "L"],
      colors: ["Light Green"],
      images: [suit2, suit3],
      category: "Women > Ethnic > Suits"
    },
    {
      id: 803,
      name: "Brown & Red Printed Suit",
      price: 190,
      oldPrice: 250,
      image: suit3,
      details: "Flared kurta with matching dupatta",
      description: "Stylish brown and red printed suit with flared kurta and matching dupatta. Made from breathable cotton fabric.",
      rating: 4.2,
      sizes: ["M", "L", "XL"],
      colors: ["Brown/Red"],
      images: [suit3, suit4],
      category: "Women > Ethnic > Suits"
    },
    {
      id: 804,
      name: "Olive Layered Suit Set",
      price: 240,
      image: suit4,
      details: "Layered kurta and churidar in rayon blend",
      description: "Beautiful olive layered suit set with detailed craftsmanship. Includes layered kurta and churidar in comfortable rayon blend.",
      rating: 4.4,
      sizes: ["XS", "S", "M", "L"],
      colors: ["Olive"],
      images: [suit4, suit5],
      category: "Women > Ethnic > Suits"
    },
    {
      id: 805,
      name: "Brown Layered Suit Set",
      price: 500,
      image: suit5,
      details: "Layered kurta and churidar in brown blend",
      description: "Elegant brown layered suit set with premium fabric and intricate detailing. Perfect for special occasions.",
      rating: 4.4,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Brown"],
      images: [suit5, suit1],
      category: "Women > Ethnic > Suits"
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
    <div className="mw-suits-container">
      <header className="mw-suits-header">
        <h1>Women's Suits Collection</h1>
        <p>Elegant suits for festive and casual moments</p>
      </header>

      <div className="mw-suits-grid">
        {products.map(product => {
          const discount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

          return (
            <article key={product.id} className="mw-suits-card">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="mw-suits-image"
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
              <div className="mw-suits-details">
                <h2>{product.name}</h2>
                <div className="price-rating">
                  <div className="price-container">
                    <span className="mw-price">₹{product.price}</span>
                    {product.oldPrice && (
                      <span className="old-price">₹{product.oldPrice}</span>
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

export default Suits;