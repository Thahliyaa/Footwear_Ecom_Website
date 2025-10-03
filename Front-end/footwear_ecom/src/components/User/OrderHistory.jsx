import React, { useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import {
  FaBoxOpen, FaCalendarAlt, FaRupeeSign, FaShoppingCart,
  FaTruck, FaTimes
} from 'react-icons/fa';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  // Fetch orders function
  const fetchOrders = useCallback(() => {
    axios.get('http://127.0.0.1:8000/api/order/history/', {
      headers: { Authorization: `Token ${token}` }
    })
    .then(res => {
      setOrders(res.data.orders || []);
    })
    .catch(() => {
      alert("Couldn't load order history");
    });
  }, [token]);

  // Load orders on page load
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Cancel order
  const cancelOrder = (orderId) => {
    axios.post(`http://127.0.0.1:8000/api/order/cancel/${orderId}/`, null, {
      headers: { Authorization: `Token ${token}` }
    })
    .then(() => {
      alert("Order cancelled successfully");
      fetchOrders(); // Refresh list
    })
    .catch(() => {
      alert("Failed to cancel order");
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🧾 Order History</h2>

      <div className="row gy-4">
        {orders.length === 0 ? (
          <div className="text-center">No orders found.</div>
        ) : (
          orders.map((order, index) => (
            <div className="col-12" key={index}>
              <div className="card shadow border-0 rounded-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between flex-wrap mb-3">
                    <div>
                      <h5 className="fw-semibold mb-1">
                        <FaBoxOpen className="me-2 text-primary" />
                        #{order.order_id}
                      </h5>
                      <p className="mb-1 text-muted">
                        <FaCalendarAlt className="me-2" />
                        {order.order_date}
                      </p>
                      <p className="mb-1 text-muted">
                        <FaShoppingCart className="me-2" />
                        {order.product_name}
                      </p>
                      <p className="mb-1 text-muted">
                        <FaRupeeSign className="me-2" />
                        ₹{order.price}
                      </p>
                      <span className={`badge bg-${order.payment_status === 'Pending' ? 'warning' : 'success'} px-3`}>
                        {order.payment_status}
                      </span>
                    </div>

                    <div className="text-end mt-2">
                      {order.payment_status === 'Pending' ? (
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => cancelOrder(order.order_id)}
                        >
                          <FaTimes className="me-1" /> Cancel Order
                        </button>
                      ) : (
                        <button className="btn btn-outline-secondary btn-sm" disabled>
                          <FaTruck className="me-1" /> Track Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
