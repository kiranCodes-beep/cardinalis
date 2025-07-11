import { useCart } from '../../Context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import './ProductCard.css';
import { toast } from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
  };

  const discountPercentage = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice * 100))
    : 0;

  return (
    <Link to={`/product/${product.id}`} className="product-link">
      <div className="product-card">
        <div className="product-image-container">
          <img 
            src={product.image || product.images?.[0]} 
            alt={product.name} 
            className="product-image" 
          />
          {product.oldPrice && (
            <span className="discount-badge">
              {discountPercentage}% OFF
            </span>
          )}
          <div className="quick-view">Quick View</div>
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
  );
};

export default ProductCard;