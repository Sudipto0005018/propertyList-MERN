
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({ location: '', type: '', sortByPrice: '' });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/properties', {
          params: filters
        });
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, [filters]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <div>
      <h2>Available Properties</h2>
      
      <div>
        <input 
          type="text" 
          name="location" 
          placeholder="Location" 
          value={filters.location} 
          onChange={handleFilterChange} 
        />
        <input 
          type="text" 
          name="type" 
          placeholder="Type (e.g. Apartment)" 
          value={filters.type} 
          onChange={handleFilterChange} 
        />
        <select name="sortByPrice" onChange={handleFilterChange} value={filters.sortByPrice}>
          <option value="">Sort by Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      <div>
        {properties.length > 0 ? (
          properties.map((property, index) => (
            <div key={index}>
              <h3>{property.location} ({property.type})</h3>
              <p>Price: ${property.price}</p>
              <p>Status: {property.availability ? 'Available' : 'Not Available'}</p>
            </div>
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyList;
