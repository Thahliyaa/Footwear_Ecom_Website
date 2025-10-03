import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      alert("Please log in to view your cart.");
      return;
    }

    axios.get('http://127.0.0.1:8000/api/cart/', {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(response => {
      setCartItems(response.data);
      const totalAmount = response.data.reduce((acc, item) => acc + (item.price || 0), 0);
      setTotal(totalAmount);
    })
    .catch(error => {
      console.error("Error fetching cart:", error);
      alert("Failed to load cart.");
    });
  }, [token]);

  const handleRemove = (cartId) => {
  axios.delete(`http://127.0.0.1:8000/api/cart/${cartId}/remove/`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
  .then(() => {
    setCartItems(prev => prev.filter(item => item.cart_id !== cartId));
    alert("Item removed from cart successfully");
  })
  .catch(() => {
    alert("Failed to remove item.");
  });
};


  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">🛒 Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center">Your cart is empty.</div>
      ) : (
        <div className="table-responsive shadow-sm">
          <table className="table align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.cart_id}>
                  <td>
                    {item.image ? (
                      <img
                      src={
                        item.image.startsWith('/')
                        ? `http://127.0.0.1:8000${item.image}`
                        : `http://127.0.0.1:8000/media/${item.image}`
                      }
                      alt={item.product_name}
                      style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                      />
                    ) : (
                    <span>No Image</span>
                    )}
                    </td>

                  <td>{item.product_name}</td>
                  <td>₹{item.price}</td>
                  <td>
                    <button className="btn btn-sm btn-danger" onClick={() => handleRemove(item.cart_id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="table-light fw-bold">
                <td colSpan="2" className="text-end">Total:</td>
                <td colSpan="2">₹{total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 text-center">
        <Link to="/checkout" className="btn btn-success me-3 px-4">
          Proceed to Checkout
        </Link>
        <Link to="/" className="btn btn-outline-dark px-4">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Cart;
