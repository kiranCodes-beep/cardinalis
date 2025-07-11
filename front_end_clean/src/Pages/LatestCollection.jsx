import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LatestCollection.css';

export const LatestCollections = () => {
  const navigate = useNavigate();

  const collections = [
    {
      id: 1,
      title: "Summer Collection",
      image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: "summer"
    },
    {
      id: 2,
      title: "Winter Collection",
      image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: "winter"
    },
    {
      id: 3,
      title: "Spring Essentials",
      image: "https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "spring"
    },
    {
      id: 4,
      title: "Autumn Favorites",
      image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: "autumn"
    }
  ];

  return (
    <div className="latest-collections">
      <h1>OUR LATEST COLLECTIONS</h1>
      <div className="collections-grid">
        {collections.map(collection => (
          <div 
            key={collection.id} 
            className="collection-card"
            onClick={() => navigate(`/shop/${collection.category}`)}
            aria-label={`View ${collection.title}`}
          >
            <div className="image-container">
              <img 
                src={collection.image} 
                alt={collection.title}
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80';
                  e.target.alt = 'Fashion collection placeholder';
                }}
              />
              <div className="collection-overlay">
                <h3>{collection.title}</h3>
                <button className="shop-now-btn">SHOP NOW</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};