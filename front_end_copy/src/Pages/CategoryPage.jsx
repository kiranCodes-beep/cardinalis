import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { toast } from 'react-hot-toast';
import ProductCard from '../Components/ProductCard/ProductCard';
import { productData } from '../Assets/productData';
import './CategoryPage.css';

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Helper to flatten all products for a main category
  const flattenCategoryProducts = (catObj) => {
    if (!catObj) return [];
    let all = [];
    Object.values(catObj).forEach(subcat => {
      if (Array.isArray(subcat)) {
        all = all.concat(subcat);
      } else if (typeof subcat === 'object' && subcat !== null) {
        all = all.concat(flattenCategoryProducts(subcat));
      }
    });
    return all;
  };

  // Category meta info
  const categoryMeta = {
    men: {
      title: "Men's Fashion",
      description: "Stylish clothing and accessories for men",
      subcategories: [
        { id: 'western', name: 'Western Wear', icon: '👔' },
        { id: 'footwear', name: 'Footwear', icon: '👟' },
        { id: 'accessories', name: 'Accessories', icon: '👜' }
      ]
    },
    women: {
      title: "Women's Fashion",
      description: "Elegant clothing and accessories for women",
      subcategories: [
        { id: 'western', name: 'Western Wear', icon: '👗' },
        { id: 'ethnic', name: 'Ethnic Wear', icon: '🥻' },
        { id: 'footwear', name: 'Footwear', icon: '👠' },
        { id: 'accessories', name: 'Accessories', icon: '👜' }
      ]
    },
    kids: {
      title: "Kids Fashion",
      description: "Adorable clothing for children of all ages",
      subcategories: [
        { id: 'girls_3_14', name: 'Girls (3-14)', icon: '👧' },
        { id: 'boys_3_14', name: 'Boys (3-14)', icon: '👦' },
        { id: 'baby_girls_0_3', name: 'Baby Girls (0-3)', icon: '👶' },
        { id: 'baby_boys_0_3', name: 'Baby Boys (0-3)', icon: '👶' }
      ]
    },
    beauty: {
      title: "Beauty & Cosmetics",
      description: "Premium beauty products for your daily routine",
      subcategories: [
        { id: 'makeup', name: 'Makeup', icon: '💄' },
        { id: 'skincare', name: 'Skincare', icon: '🧴' },
        { id: 'fragrance', name: 'Fragrance', icon: '🌸' },
        { id: 'haircare', name: 'Hair Care', icon: '💇‍♀️' }
      ]
    },
    accessories: {
      title: "Accessories",
      description: "Complete your look with stylish accessories",
      subcategories: [
        { id: 'women', name: 'Women', icon: '👩' },
        { id: 'men', name: 'Men', icon: '👨' }
      ]
    }
  };

  useEffect(() => {
    setIsLoading(true);
    let catProducts = [];
    if (category && productData[category]) {
      catProducts = flattenCategoryProducts(productData[category]);
    }
    setProducts(catProducts);
    setFilteredProducts(catProducts);
    setIsLoading(false);
  }, [category]);

  useEffect(() => {
    let filtered = [...products];
    // Filter by subcategory (if possible)
    if (selectedSubcategory !== 'all') {
      filtered = filtered.filter(product => {
        // Try to match subcategory id or category name
        return (
          product.subcategory === selectedSubcategory ||
          product.category?.toLowerCase().replace(/\s/g, '_') === selectedSubcategory
        );
      });
    }
    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.id + '').localeCompare(a.id + ''));
        break;
      default:
        // featured - keep original order
        break;
    }
    setFilteredProducts(filtered);
  }, [products, selectedSubcategory, priceRange, sortBy]);

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    toast.success(`${product.name} added to cart!`);
  };

  if (isLoading) {
    return (
      <div className="category-loading">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  const currentCategory = categoryMeta[category];
  if (!currentCategory) {
    return (
      <div className="category-not-found">
        <h2>Category Not Found</h2>
        <p>The category you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/')} className="primary-button">
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="category-page">
      <div className="category-header">
        <div className="category-info">
          <h1>{currentCategory.title}</h1>
          <p>{currentCategory.description}</p>
        </div>
      </div>

      <div className="category-content">
        <div className="filters-sidebar">
          <div className="filter-section">
            <h3>Categories</h3>
            <div className="subcategory-filters">
              <button
                className={`filter-btn ${selectedSubcategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedSubcategory('all')}
              >
                All Products
              </button>
              {currentCategory.subcategories.map(subcat => (
                <button
                  key={subcat.id}
                  className={`filter-btn ${selectedSubcategory === subcat.id ? 'active' : ''}`}
                  onClick={() => setSelectedSubcategory(subcat.id)}
                >
                  <span className="subcat-icon">{subcat.icon}</span>
                  {subcat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="price-range">
              <input
                type="range"
                min="0"
                max="2000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="price-slider"
              />
              <div className="price-labels">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div className="filter-section">
            <h3>Sort By</h3>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        <div className="products-section">
          <div className="products-header">
            <h2>
              {selectedSubcategory === 'all' 
                ? 'All Products' 
                : currentCategory.subcategories.find(s => s.id === selectedSubcategory)?.name
              }
              <span className="product-count"> ({filteredProducts.length} items)</span>
            </h2>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card-wrapper">
                  <ProductCard 
                    product={product}
                    onAddToCart={() => handleAddToCart(product)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="no-products">
              <h3>No products found</h3>
              <p>Try adjusting your filters to see more products.</p>
              <button 
                onClick={() => {
                  setSelectedSubcategory('all');
                  setPriceRange([0, 2000]);
                  setSortBy('featured');
                }}
                className="reset-filters-btn"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage; 