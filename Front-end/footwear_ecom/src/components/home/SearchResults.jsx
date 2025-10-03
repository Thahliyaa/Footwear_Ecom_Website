import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const query = new URLSearchParams(useLocation().search).get('q');

  useEffect(() => {
    if (query) {
      axios.get(`http://127.0.0.1:8000/api/products/search/?q=${query}`)
        .then(res => setResults(res.data))
        .catch(err => console.error(err));
    }
  }, [query]);

  return (
    <div className="container mt-4">
      <h4>Search Results for "{query}"</h4>
      {results.length === 0 ? (
        <p>No matching products found.</p>
      ) : (
        <div className="row">
          {results.map(product => (
            <div className="col-md-4 mb-3" key={product.product_id}>
              <div className="card">
                <img src={`http://127.0.0.1:8000${product.image}`} alt={product.name} className="card-img-top" />
                <div className="card-body">
                  <h5>{product.name}</h5>
                  <p>₹{product.price} | {product.brand}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
