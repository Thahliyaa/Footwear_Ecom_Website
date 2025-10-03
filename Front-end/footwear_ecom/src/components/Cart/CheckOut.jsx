import React, { useEffect, useState } from 'react';
import { FaShippingFast, FaUserAlt, FaPhoneAlt } from 'react-icons/fa';
import axios from 'axios';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingCost] = useState(100);
  const [userData, setUserData] = useState({ name: '', phone: '', address: '' });
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      alert('Please log in first!');
      return;
    }

    axios.get('http://127.0.0.1:8000/api/cart/', {
      headers: { Authorization: `Token ${token}` }
    })
    .then(res => {
      setCartItems(res.data);
    })
    .catch(() => alert('Failed to fetch cart items'));
  }, [token]);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0) + shippingCost;

  const handleOrderSubmit = () => {
    const orderData = {
      name: userData.name,
      phone: userData.phone,
      address: userData.address,
      items: cartItems,
      total: totalPrice
    };

    axios.post('http://127.0.0.1:8000/api/order/place/', orderData, {
      headers: { Authorization: `Token ${token}` }
    })
    .then(() => alert('✅ Order placed successfully!'))
    .catch(() => alert('❌ Failed to place order'));
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">🧾 Checkout</h2>

      <div className="row g-4">
        {/* Shipping Info */}
        <div className="col-md-7">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-light fw-bold fs-5">
              <FaShippingFast className="me-2 text-dark" />
              Shipping Details
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <FaUserAlt className="me-2 text-muted" />
                    Full Name
                  </label>
                  <input type="text" className="form-control" placeholder="Enter full name"
                    value={userData.name}
                    onChange={e => setUserData({ ...userData, name: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <FaPhoneAlt className="me-2 text-muted" />
                    Phone Number
                  </label>
                  <input type="text" className="form-control" placeholder="Enter phone number"
                    value={userData.phone}
                    onChange={e => setUserData({ ...userData, phone: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Shipping Address</label>
                  <textarea className="form-control" rows="4" placeholder="Enter complete address"
                    value={userData.address}
                    onChange={e => setUserData({ ...userData, address: e.target.value })}></textarea>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-md-5">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-light fw-bold fs-5">
              Order Summary
            </div>
            <div className="card-body">
              {cartItems.map((item, index) => (
                <div key={index} className="d-flex justify-content-between mb-2">
                  <span>{item.product_name} x1</span>
                  <span>₹{item.price}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between fw-semibold mb-2">
                <span>Shipping</span>
                <span>₹{shippingCost}</span>
              </div>
              <div className="d-flex justify-content-between fs-5 fw-bold">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
              <button className="btn btn-dark w-100 mt-4" onClick={handleOrderSubmit}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
