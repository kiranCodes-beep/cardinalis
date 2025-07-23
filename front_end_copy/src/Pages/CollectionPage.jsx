import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { toast } from 'react-hot-toast';
import ProductCard from '../Components/ProductCard/ProductCard';
import './CollectionPage.css';

const CollectionPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [sortBy, setSortBy] = useState('featured');

  // Collection data with products
  const collectionData = {
    summer: {
      title: "Summer Collection",
      description: "Light, breathable styles perfect for warm weather",
      products: [
        {
          id: 'summer-1',
          name: 'Floral Summer Dress',
          price: 899,
          oldPrice: 1199,
          image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          rating: 4.5,
          category: 'Summer Collection'
        },
        {
          id: 'summer-2',
          name: 'Cotton Linen Shirt',
          price: 599,
          oldPrice: 799,
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          rating: 4.3,
          category: 'Summer Collection'
        },
        {
          id: 'summer-3',
          name: 'Lightweight Shorts',
          price: 449,
          image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          rating: 4.2,
          category: 'Summer Collection'
        },
        {
          id: 'summer-4',
          name: 'Straw Hat',
          price: 299,
          oldPrice: 399,
          image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          rating: 4.7,
          category: 'Summer Collection'
        },
        {
          id: 'summer-5',
          name: 'Sunglasses',
          price: 399,
          image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          rating: 4.4,
          category: 'Summer Collection'
        },
        {
          id: 'summer-6',
          name: 'Beach Towel',
          price: 199,
          oldPrice: 249,
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          rating: 4.1,
          category: 'Summer Collection'
        }
      ]
    },
    winter: {
      title: "Winter Collection",
      description: "Warm, cozy styles to keep you comfortable in cold weather",
      products: [
        {
          id: 'winter-1',
          name: 'Wool Sweater',
          price: 1299,
          oldPrice: 1599,
          image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          rating: 4.6,
          category: 'Winter Collection'
        },
        {
          id: 'winter-2',
          name: 'Puffer Jacket',
          price: 1899,
          oldPrice: 2299,
          image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          rating: 4.8,
          category: 'Winter Collection'
        },
        {
          id: 'winter-3',
          name: 'Scarf',
          price: 399,
          image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          rating: 4.3,
          category: 'Winter Collection'
        },
        {
          id: 'winter-4',
          name: 'Winter Boots',
          price: 1499,
          oldPrice: 1799,
          image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          rating: 4.5,
          category: 'Winter Collection'
        },
        {
          id: 'winter-5',
          name: 'Thermal Underwear',
          price: 599,
          image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          rating: 4.2,
          category: 'Winter Collection'
        },
        {
          id: 'winter-6',
          name: 'Beanie Hat',
          price: 299,
          oldPrice: 349,
          image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          rating: 4.4,
          category: 'Winter Collection'
        }
      ]
    },
    spring: {
      title: "Spring Essentials",
      description: "Fresh, vibrant styles perfect for the blooming season",
      products: [
        {
          id: 'spring-1',
          name: 'Light Cardigan',
          price: 799,
          oldPrice: 999,
          image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          rating: 4.4,
          category: 'Spring Essentials'
        },
        {
          id: 'spring-2',
          name: 'Pastel Dress',
          price: 899,
          image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          rating: 4.6,
          category: 'Spring Essentials'
        },
        {
          id: 'spring-3',
          name: 'Denim Jacket',
          price: 999,
          oldPrice: 1199,
          image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          rating: 4.3,
          category: 'Spring Essentials'
        },
        {
          id: 'spring-4',
          name: 'Floral Shirt',
          price: 549,
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          rating: 4.5,
          category: 'Spring Essentials'
        },
        {
          id: 'spring-5',
          name: 'Canvas Sneakers',
          price: 699,
          oldPrice: 799,
          image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          rating: 4.2,
          category: 'Spring Essentials'
        },
        {
          id: 'spring-6',
          name: 'Light Scarf',
          price: 299,
          image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          rating: 4.1,
          category: 'Spring Essentials'
        }
      ]
    },
    autumn: {
      title: "Autumn Favorites",
      description: "Cozy, warm tones perfect for the fall season",
      products: [
        {
          id: 'autumn-1',
          name: 'Knit Sweater',
          price: 1099,
          oldPrice: 1299,
          image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          rating: 4.7,
          category: 'Autumn Favorites'
        },
        {
          id: 'autumn-2',
          name: 'Leather Jacket',
          price: 1899,
          oldPrice: 2199,
          image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          rating: 4.8,
          category: 'Autumn Favorites'
        },
        {
          id: 'autumn-3',
          name: 'Plaid Shirt',
          price: 649,
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          rating: 4.4,
          category: 'Autumn Favorites'
        },
        {
          id: 'autumn-4',
          name: 'Boots',
          price: 1299,
          oldPrice: 1499,
          image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          rating: 4.6,
          category: 'Autumn Favorites'
        },
        {
          id: 'autumn-5',
          name: 'Warm Scarf',
          price: 449,
          image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          rating: 4.3,
          category: 'Autumn Favorites'
        },
        {
          id: 'autumn-6',
          name: 'Beanie',
          price: 349,
          oldPrice: 399,
          image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          rating: 4.5,
          category: 'Autumn Favorites'
        }
      ]
    }
  };

  const collection = collectionData[category];

  if (!collection) {
    return (
      <div className="collection-not-found">
        <h2>Collection Not Found</h2>
        <p>The collection you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/latest-collections')} className="back-btn">
          Back to Collections
        </button>
      </div>
    );
  }

  const handleSort = (sortType) => {
    setSortBy(sortType);
  };

  const sortedProducts = [...collection.products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="collection-page">
      <div className="collection-header">
        <div className="collection-info">
          <h1>{collection.title}</h1>
          <p>{collection.description}</p>
          <span className="product-count">{collection.products.length} Products</span>
        </div>
        <div className="collection-controls">
          <select 
            value={sortBy} 
            onChange={(e) => handleSort(e.target.value)}
            className="sort-select"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      <div className="products-grid">
        {sortedProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product}
            onAddToCart={() => {
              addToCart({
                ...product,
                quantity: 1
              });
              toast.success(`${product.name} added to cart!`);
            }}
          />
        ))}
      </div>

      <div className="collection-footer">
        <button onClick={() => navigate('/latest-collections')} className="back-to-collections">
          ← Back to Collections
        </button>
      </div>
    </div>
  );
};

export default CollectionPage; 