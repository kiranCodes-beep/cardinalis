import React, { useEffect, useState } from 'react';
import { Hero } from '../Components/hero/hero';
import { useCart } from '../Context/CartContext';

import './All.css';

export const All = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  const productImages = {
    'T-shirt': 'https://cdn-icons-png.flaticon.com/512/892/892458.png',
    'Jeans': 'https://cdn-icons-png.flaticon.com/512/892/892457.png',
    'Sneakers': 'https://cdn-icons-png.flaticon.com/512/892/892462.png',
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home-page">
      <div className="content-wrap">
        <Hero />
      </div>
      <div className="products-list">
        {loading && <p>Loading products...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {/* Product grid removed as per user request */}
      </div>
    </div>
  );
};