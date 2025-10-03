import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/products/${id}/`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    const token = localStorage.getItem('token');
    console.log("Token from localStorage:", token);  

    if (!token || token === "undefined" || token === "null") {
      alert("User not logged in");
      return;
    }

    axios.post(
      'http://127.0.0.1:8000/api/cart/add/',
      { product_id: product.product_id || product.id },
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    )
    .then(response => {
      console.log("Cart add response:", response.data);
      alert(response.data.message);
    })
    .catch(error => {
      console.error("Cart add error:", error.response);
      alert(error.response?.data?.message || 'Failed to add to cart');
    });
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mt-5 text-center">
        <h3 className="text-danger">Product not found.</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="row g-0">
          <div className="col-md-6">
            <img
              src={`http://127.0.0.1:8000/media${product.image}`}
              alt={product.name}
              className="img-fluid h-100 w-100"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p className="card-text"><strong>Brand:</strong> {product.brand}</p>
              <p className="card-text"><strong>Category:</strong> {product.category}</p>
              <p className="card-text"><strong>Sizes:</strong> {product.size || 'Free Size'}</p>
              <p className="card-text"><strong>Description:</strong> {product.description}</p>
              <p className="fw-bold fs-4 text-success">₹{product.price}</p>
              <button className="btn btn-success me-3" onClick={handleAddToCart}>Add to Cart 🛒</button>
              <button className="btn btn-primary">Buy Now 💳</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
