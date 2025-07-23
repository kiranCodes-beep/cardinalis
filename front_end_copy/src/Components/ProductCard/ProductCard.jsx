import React, { useState, useRef } from 'react';
import { useCart } from '../../Context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import './ProductCard.css';
import { toast } from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const imgRef = useRef();

  // Animated add-to-cart effect
  const handleAddToCart = (e, fromModal = false) => {
    e.preventDefault();
    e.stopPropagation();
    // Fly to cart animation
    const img = imgRef.current;
    if (img) {
      const cartIcon = document.querySelector('.cart-icon, .navbar-cart');
      if (cartIcon) {
        const imgRect = img.getBoundingClientRect();
        const cartRect = cartIcon.getBoundingClientRect();
        const clone = img.cloneNode(true);
        clone.style.position = 'fixed';
        clone.style.left = imgRect.left + 'px';
        clone.style.top = imgRect.top + 'px';
        clone.style.width = imgRect.width + 'px';
        clone.style.height = imgRect.height + 'px';
        clone.style.zIndex = 9999;
        clone.style.transition = 'all 0.8s cubic-bezier(0.4,0,0.2,1)';
        document.body.appendChild(clone);
        setTimeout(() => {
          clone.style.left = cartRect.left + cartRect.width / 2 - imgRect.width / 4 + 'px';
          clone.style.top = cartRect.top + cartRect.height / 2 - imgRect.height / 4 + 'px';
          clone.style.width = imgRect.width / 2 + 'px';
          clone.style.height = imgRect.height / 2 + 'px';
          clone.style.opacity = 0.5;
        }, 10);
        setTimeout(() => {
          clone.remove();
        }, 850);
      }
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || product.images?.[0],
      quantity: 1
    });
    toast.success(`${product.name} added to cart!`, {
      duration: 2000,
      position: 'bottom-right',
      action: {
        label: 'View Cart',
        onClick: () => navigate('/cart')
      }
    });
    if (fromModal) setShowModal(false);
  };

  const discountPercentage = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice * 100))
    : 0;

  // For hover alternate image
  const images = product.images && product.images.length > 0
    ? product.images
    : [product.image];

  return (
    <>
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-card">
          <div 
            className="product-image-container"
            onMouseEnter={() => setGalleryIndex(1)}
            onMouseLeave={() => setGalleryIndex(0)}
            onClick={e => { e.preventDefault(); setShowModal(true); }}
          >
            <img 
              ref={imgRef}
              src={images[galleryIndex % images.length] || images[0]} 
              alt={product.name} 
              className="product-image hover-animate" 
            />
            {product.oldPrice && (
              <span className="discount-badge">
                {discountPercentage}% OFF
              </span>
            )}
            <div className="quick-view" onClick={e => { e.preventDefault(); setShowModal(true); }}>Quick View</div>
          </div>
          <div className="product-info">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <div className="price-rating">
              <div className="price-container">
                <span className="current-price">₹{product.price.toFixed(2)}</span>
                {product.oldPrice && (
                  <span className="old-price">₹{product.oldPrice.toFixed(2)}</span>
                )}
              </div>
              <div className="rating-container">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i} 
                    className={`star ${
                      i < Math.floor(product.rating) ? 'filled' : ''
                    } ${
                      i === Math.floor(product.rating) && product.rating % 1 >= 0.5 ? 'half-filled' : ''
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="rating-count">({product.rating.toFixed(1)})</span>
              </div>
            </div>
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
      {showModal && (
        <div className="quick-view-modal" onClick={() => setShowModal(false)}>
          <div className="quick-view-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowModal(false)}>&times;</button>
            <div className="modal-gallery">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={product.name + ' ' + (idx + 1)}
                  className={`modal-image${galleryIndex === idx ? ' active' : ''}`}
                  onMouseEnter={() => setGalleryIndex(idx)}
                  onClick={() => setGalleryIndex(idx)}
                />
              ))}
            </div>
            <div className="modal-details">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <div className="modal-price">
                <span className="current-price">₹{product.price.toFixed(2)}</span>
                {product.oldPrice && (
                  <span className="old-price">₹{product.oldPrice.toFixed(2)}</span>
                )}
              </div>
              <div className="modal-rating">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i} 
                    className={`star ${
                      i < Math.floor(product.rating) ? 'filled' : ''
                    } ${
                      i === Math.floor(product.rating) && product.rating % 1 >= 0.5 ? 'half-filled' : ''
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="rating-count">({product.rating.toFixed(1)})</span>
              </div>
              <button 
                className="add-to-cart-btn modal-add"
                onClick={e => handleAddToCart(e, true)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;