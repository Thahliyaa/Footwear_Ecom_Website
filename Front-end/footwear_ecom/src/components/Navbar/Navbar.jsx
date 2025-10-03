import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  // Dummy cart count fetch – replace with real API call
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cart.length);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top px-4" style={{ zIndex: 999 }}>
        {/* Brand */}
        <Link to="/" className="navbar-brand" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1.5rem" }}>
          Footwear
        </Link>

        {/* Mobile Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Centered Menu Links */}
          <ul className="navbar-nav mx-auto" style={{ gap: '30px' }}>
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/men" className="nav-link text-white">Men</Link>
            </li>
            <li className="nav-item">
              <Link to="/women" className="nav-link text-white">Women</Link>
            </li>
            <li className="nav-item">
              <Link to="/kids" className="nav-link text-white">Kids</Link>
            </li>
          </ul>

          {/* Right-side: Search, Cart, Profile */}
          <div className="d-flex align-items-center ms-auto">
            <form className="d-flex me-3" onSubmit={handleSearch}>
              <input
                className="form-control me-2 rounded-pill"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-outline-light rounded-circle" type="submit">
                <FaSearch />
              </button>
            </form>

            {/* Cart */}
            <Link to="/cart" className="btn btn-link text-white position-relative me-3">
              <FaShoppingCart size={20} />
              {cartCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: '0.7rem' }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-link text-white dropdown-toggle"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaUser size={20} />
              </button>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark" aria-labelledby="userDropdown">
                <li><Link className="dropdown-item" to="/user/profile">Profile</Link></li>
                <li><Link className="dropdown-item" to="/orders">Order History</Link></li>
                <li><Link className="dropdown-item" to="/change-password">Change Password</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Add top padding to prevent content being hidden behind fixed navbar */}
      <div style={{ paddingTop: '70px' }}></div>
    </>
  );
}

export default Navbar;
