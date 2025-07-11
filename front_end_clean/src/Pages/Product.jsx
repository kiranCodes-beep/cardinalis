import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { toast } from 'react-hot-toast';
import { productData } from '../Assets/productData';
import './Product.css';

export const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedImage, setSelectedImage] = useState(0);

  // Collection products (from CollectionPage)
  const collectionProducts = [
    // Summer Collection
    {
      id: 'summer-1',
      name: 'Floral Summer Dress',
      price: 899,
      oldPrice: 1199,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.5,
      category: 'Summer Collection',
      description: 'Beautiful floral summer dress perfect for warm weather',
      images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      id: 'summer-2',
      name: 'Cotton Linen Shirt',
      price: 599,
      oldPrice: 799,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.3,
      category: 'Summer Collection',
      description: 'Lightweight cotton linen shirt for summer comfort',
      images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 'summer-3',
      name: 'Lightweight Shorts',
      price: 449,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.2,
      category: 'Summer Collection',
      description: 'Comfortable lightweight shorts for summer activities',
      images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 'summer-4',
      name: 'Straw Hat',
      price: 299,
      oldPrice: 399,
      image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      category: 'Summer Collection',
      description: 'Stylish straw hat for sun protection',
      images: ['https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      sizes: ['One Size']
    },
    {
      id: 'summer-5',
      name: 'Sunglasses',
      price: 399,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.4,
      category: 'Summer Collection',
      description: 'Trendy sunglasses for summer style',
      images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      sizes: ['One Size']
    },
    {
      id: 'summer-6',
      name: 'Beach Towel',
      price: 199,
      oldPrice: 249,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.1,
      category: 'Summer Collection',
      description: 'Soft beach towel for summer relaxation',
      images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      sizes: ['One Size']
    },
    // Winter Collection
    {
      id: 'winter-1',
      name: 'Wool Sweater',
      price: 1299,
      oldPrice: 1599,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.6,
      category: 'Winter Collection',
      description: 'Warm wool sweater for cold weather',
      images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 'winter-2',
      name: 'Puffer Jacket',
      price: 1899,
      oldPrice: 2299,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      category: 'Winter Collection',
      description: 'Insulated puffer jacket for extreme cold',
      images: ['https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 'winter-3',
      name: 'Scarf',
      price: 399,
      image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.3,
      category: 'Winter Collection',
      description: 'Warm scarf for winter protection',
      images: ['https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      sizes: ['One Size']
    },
    {
      id: 'winter-4',
      name: 'Winter Boots',
      price: 1499,
      oldPrice: 1799,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.5,
      category: 'Winter Collection',
      description: 'Waterproof winter boots for snow',
      images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      sizes: ['7', '8', '9', '10', '11']
    },
    {
      id: 'winter-5',
      name: 'Thermal Underwear',
      price: 599,
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.2,
      category: 'Winter Collection',
      description: 'Thermal underwear for extra warmth',
      images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 'winter-6',
      name: 'Beanie Hat',
      price: 299,
      oldPrice: 349,
      image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.4,
      category: 'Winter Collection',
      description: 'Warm beanie hat for winter',
      images: ['https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      sizes: ['One Size']
    },
    // Spring Collection
    {
      id: 'spring-1',
      name: 'Light Cardigan',
      price: 799,
      oldPrice: 999,
      image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.4,
      category: 'Spring Essentials',
      description: 'Lightweight cardigan perfect for spring weather',
      images: ['https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      sizes: ['XS', 'S', 'M', 'L']
    },
    {
      id: 'spring-2',
      name: 'Pastel Dress',
      price: 899,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.6,
      category: 'Spring Essentials',
      description: 'Beautiful pastel dress for spring',
      images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      id: 'spring-3',
      name: 'Denim Jacket',
      price: 999,
      oldPrice: 1199,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.3,
      category: 'Spring Essentials',
      description: 'Classic denim jacket for spring',
      images: ['https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 'spring-4',
      name: 'Floral Shirt',
      price: 549,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.5,
      category: 'Spring Essentials',
      description: 'Floral print shirt for spring',
      images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 'spring-5',
      name: 'Canvas Sneakers',
      price: 699,
      oldPrice: 799,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.2,
      category: 'Spring Essentials',
      description: 'Comfortable canvas sneakers for spring',
      images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      sizes: ['7', '8', '9', '10', '11']
    },
    {
      id: 'spring-6',
      name: 'Light Scarf',
      price: 299,
      image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.1,
      category: 'Spring Essentials',
      description: 'Light scarf for spring breeze',
      images: ['https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      sizes: ['One Size']
    },
    // Autumn Collection
    {
      id: 'autumn-1',
      name: 'Knit Sweater',
      price: 1099,
      oldPrice: 1299,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      category: 'Autumn Favorites',
      description: 'Cozy knit sweater for autumn',
      images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 'autumn-2',
      name: 'Leather Jacket',
      price: 1899,
      oldPrice: 2199,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      category: 'Autumn Favorites',
      description: 'Classic leather jacket for autumn',
      images: ['https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 'autumn-3',
      name: 'Plaid Shirt',
      price: 649,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.4,
      category: 'Autumn Favorites',
      description: 'Classic plaid shirt for autumn',
      images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 'autumn-4',
      name: 'Boots',
      price: 1299,
      oldPrice: 1499,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.6,
      category: 'Autumn Favorites',
      description: 'Stylish boots for autumn',
      images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      sizes: ['7', '8', '9', '10', '11']
    },
    {
      id: 'autumn-5',
      name: 'Warm Scarf',
      price: 449,
      image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.3,
      category: 'Autumn Favorites',
      description: 'Warm scarf for autumn chill',
      images: ['https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      sizes: ['One Size']
    },
    {
      id: 'autumn-6',
      name: 'Beanie',
      price: 349,
      oldPrice: 399,
      image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.5,
      category: 'Autumn Favorites',
      description: 'Warm beanie for autumn',
      images: ['https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      sizes: ['One Size']
    }
  ];

  // Flatten all products from productData into a single array
  const getAllProducts = () => {
    const allProducts = [];
    
    // Helper function to recursively extract products
    const extractProducts = (obj) => {
      if (Array.isArray(obj)) {
        allProducts.push(...obj);
      } else if (typeof obj === 'object' && obj !== null) {
        Object.values(obj).forEach(extractProducts);
      }
    };
    
    extractProducts(productData);
    return allProducts;
  };

  // Category products (from CategoryPage)
  const categoryProducts = [
    // Men's Products
    {
      id: 'men-1',
      name: 'Classic White Shirt',
      price: 899,
      oldPrice: 1199,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.5,
      category: 'Western Wear',
      description: 'Classic white formal shirt for professional look',
      images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 'men-2',
      name: 'Slim Fit Jeans',
      price: 1299,
      oldPrice: 1599,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.3,
      category: 'Western Wear',
      description: 'Comfortable slim fit jeans for casual wear',
      images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      sizes: ['30', '32', '34', '36']
    },
    // Women's Products
    {
      id: 'women-1',
      name: 'Floral Summer Dress',
      price: 1499,
      oldPrice: 1899,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      category: 'Western Wear',
      description: 'Beautiful floral summer dress perfect for warm weather',
      images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      id: 'women-2',
      name: 'Skinny Jeans',
      price: 1299,
      oldPrice: 1599,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.5,
      category: 'Western Wear',
      description: 'Classic skinny fit jeans for women',
      images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      sizes: ['26', '28', '30', '32']
    },
    // Kids Products
    {
      id: 'kids-1',
      name: 'Superhero T-Shirt',
      price: 499,
      oldPrice: 699,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.6,
      category: 'Boys (3-14)',
      description: 'Fun superhero themed t-shirt for boys',
      images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y', '11-12Y']
    },
    // Beauty Products
    {
      id: 'beauty-1',
      name: 'Foundation',
      price: 1299,
      oldPrice: 1599,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      category: 'Makeup',
      description: 'Long-lasting foundation for flawless coverage',
      images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      sizes: ['30ml']
    },
    // Accessories Products
    {
      id: 'acc-1',
      name: 'Leather Tote Bag',
      price: 2499,
      oldPrice: 2999,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      category: 'Bags & Wallets',
      description: 'Spacious leather tote bag for everyday use',
      images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
      sizes: ['One Size']
    }
  ];

  const products = [...getAllProducts(), ...collectionProducts, ...categoryProducts];
  
  // Find product by ID (handle both string and numeric IDs)
  const product = products.find(p => {
    // Try exact string match first
    if (p.id === productId) return true;
    // Try numeric match if productId is a number
    if (!isNaN(productId) && p.id === parseInt(productId)) return true;
    return false;
  });

  if (!product) {
    return (
      <div className="product-error">
        <h3>Product Not Found</h3>
        <button onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
      size: product.sizes ? selectedSize : undefined,
      quantity
    });
  };

  return (
    <div className="product-page">
      <div className="product-gallery">
        {product.images?.map((img, i) => (
          <img 
            key={i}
            src={img}
            alt={product.name}
            className={`thumbnail ${selectedImage === i ? 'active' : ''}`}
            onClick={() => setSelectedImage(i)}
          />
        ))}
      </div>

      <div className="product-details">
        <h1>{product.name}</h1>
        <p className="price">${product.price.toFixed(2)}</p>

        {product.sizes && (
          <select 
            value={selectedSize} 
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            {product.sizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        )}

        <div className="quantity-selector">
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(q => Math.min(10, q + 1))}>+</button>
        </div>

        <button className="add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>

        <div className="product-description">
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};