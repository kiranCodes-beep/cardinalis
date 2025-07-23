import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productData } from '../Assets/productData';
import { useLocation } from 'react-router-dom';
import ProductCard from '../Components/ProductCard/ProductCard';
import './ShopCategory.css';

export const ShopCategory = ({ showTitle = true, forceHideTitle = false }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { category, subcategory } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!category) {
          setProducts([]);
          return;
        }

        const categoryKey = category.toLowerCase();
        let categoryProducts = [];

        if (categoryKey === 'kids') {
          const kidsSubcategories = {
            'boys-3-14': 'boys_3_14',
            'girls-3-14': 'girls_3_14',
            'baby-boy-0-3': 'baby_boy_0_3',
            'baby-girl-0-3': 'baby_girl_0_3'
          };
          
          if (subcategory && kidsSubcategories[subcategory]) {
            categoryProducts = productData.kids?.[kidsSubcategories[subcategory]] || [];
          } else {
            categoryProducts = Object.values(productData.kids || {})
              .flatMap(subcat => Object.values(subcat || {}).flat());
          }
        } else {
          const categoryData = productData[categoryKey] || {};
          
          if (subcategory) {
            const subcategoryKey = subcategory
              .replace(/-/g, ' ')
              .replace('flat shoes', 'flat_shoes')
              .replace('flat sandals', 'flat_sandals')
              .replace('lip nails', 'lip_nails');
            
            categoryProducts = categoryData[subcategoryKey] || [];
          } else {
            categoryProducts = Object.values(categoryData)
              .flatMap(subcat => Array.isArray(subcat) ? subcat : Object.values(subcat || {}).flat());
          }
        }

        setProducts(Array.isArray(categoryProducts) ? categoryProducts : []);
      } catch (err) {
        console.error("Error loading products:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category, subcategory]);

  const getCategoryTitle = () => {
    if (!category) return 'Products';
    
    const baseTitle = category.charAt(0).toUpperCase() + category.slice(1);
    
    if (!subcategory) return baseTitle;
    
    return `${subcategory.replace(/-/g, ' ').replace(/_/g, ' ')} (${baseTitle})`;
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="shop-category error">
        <h3>Something went wrong</h3>
        <p>We're having trouble loading this category.</p>
        <button onClick={() => navigate('/')} className="browse-btn">
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="shop-category-container">
      {!forceHideTitle && showTitle && !isHomePage && (
        <h1 className="category-title">{getCategoryTitle()}</h1>
      )}
      
      {products.length > 0 ? (
        <div className="products-grid">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              className="product-card"
            />
          ))}
        </div>
      ) : (
        // Only show empty message on actual category pages, not on home page
        (category && subcategory) && (
          <div className="empty-state">
            <h2>New Collection Coming Soon!</h2>
            <p>We're updating our collection with fresh styles.</p>
            <button 
              onClick={() => navigate('/')}
              className="primary-button"
            >
              Continue Shopping
            </button>
          </div>
        )
      )}
    </div>
  );
};