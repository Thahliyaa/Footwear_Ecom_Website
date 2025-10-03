import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

function ProductList() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedCategory = params.get('category');

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/products/')
      .then(response => {
        setProducts(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category.toLowerCase() === selectedCategory.toLowerCase())
    : products;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-capitalize text-center">
        {selectedCategory ? `Showing ${selectedCategory} products` : 'All Products'}
      </h2>

      {filteredProducts.length === 0 ? (
        <p className="text-center">No products found.</p>
      ) : (
        <div className="row g-4">
          {filteredProducts.map((product) => (
            <div key={product.product_id} className="col-md-4">
              <Link to={`/product/${product.product_id}`} className="text-decoration-none text-dark">
                <div className="card h-100 shadow-sm">
                  <img
                  src={`http://127.0.0.1:8000/media/${product.image}`}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: '250px', objectFit: 'cover' }}
                  />

                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="fw-bold">₹{product.price}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
