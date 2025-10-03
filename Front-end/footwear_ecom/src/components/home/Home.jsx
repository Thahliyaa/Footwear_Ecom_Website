import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/products/')
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="container-fluid px-0">

      {/* Hero Section */}
      <section className="position-relative text-center text-white" style={{
        backgroundImage: "url('/Slides/slide1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "500px",
      }}>
        <div className="d-flex flex-column justify-content-center align-items-center h-100 bg-dark bg-opacity-50">
          <h1 className="display-4 fw-bold">Step Into Style</h1>
          <p className="lead">Discover Men, Women & Kids Footwear Collections</p>
          <Link to="/products" className="btn btn-light btn-lg mt-3 shadow-sm" style={{ transition: "0.3s" }}>
            Shop Now
          </Link>
        </div>
      </section>

      {/* Category Section */}
      <section className="container my-5">
        <h2 className="text-center fw-bold mb-4">Shop by Category</h2>
        <div className="row g-4">
          {[
            { name: "Men", img: "/categories/men.jpg" },
            { name: "Women", img: "/categories/women.jpg" },
            { name: "Kids", img: "/categories/kids.jpg" },
          ].map((cat, idx) => (
            <div className="col-md-4" key={idx}>
              <div className="card border-0 shadow-sm h-100 category-card" style={{ transition: "0.3s", cursor: "pointer" }}>
                <img src={cat.img} alt={cat.name} className="card-img-top" style={{ height: "300px", objectFit: "cover" }} />
                <div className="card-body text-center">
                  <h5 className="fw-bold">{cat.name}</h5>
                  <Link to={`/products?category=${cat.name.toLowerCase()}`} className="btn btn-dark mt-2">
                    Explore {cat.name}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Collection */}
      <section className="container my-5">
        <h2 className="text-center fw-bold mb-4">Our Latest Collection</h2>
        <div className="row">
          {products.length > 0 ? (
            products.slice(0, 12).map((product, idx) => (
              <div className="col-6 col-md-3 mb-4" key={idx}>
                <div className="card border-0 shadow-sm h-100" style={{ transition: "transform 0.3s", cursor: "pointer" }}>
                  <Card
                    image={`http://127.0.0.1:8000/media/${product.image.replace(/^\/+/, '')}`}
                    title={product.title || product.name}
                    price={product.price}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No products available</p>
          )}
        </div>
      </section>

      {/* Popular Brands */}
      <section className="bg-light py-5">
        <h3 className="text-center fw-bold mb-5">Popular Brands</h3>
        <div className="container d-flex justify-content-center flex-wrap gap-4">
          {["nike", "adidas", "puma", "reebok", "bata", "sketchers"].map((brand, idx) => (
            <div key={idx} className="d-flex align-items-center justify-content-center bg-white shadow-sm rounded p-3"
              style={{
                width: "150px",
                height: "100px",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer"
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'; }}
            >
              <img src={`/brands/${brand}.png`} alt={brand} className="img-fluid" style={{ maxHeight: "60px", objectFit: "contain" }} />
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-light pt-5 pb-4 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-3">
              <h5>About Us</h5>
              <p className="small" style={{ lineHeight: "1.6" }}>
                StepUp Footwear brings the latest footwear trends with a perfect blend of comfort, style, and quality.
              </p>
            </div>
            <div className="col-md-4 mb-3">
              <h5>Quick Links</h5>
              <ul className="list-unstyled small">
                <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
                <li><Link to="/products?category=men" className="text-light text-decoration-none">Men</Link></li>
                <li><Link to="/products?category=women" className="text-light text-decoration-none">Women</Link></li>
                <li><Link to="/products?category=kids" className="text-light text-decoration-none">Kids</Link></li>
                <li><Link to="/cart" className="text-light text-decoration-none">Cart</Link></li>
              </ul>
            </div>
            <div className="col-md-4 mb-3">
              <h5>Contact Us</h5>
              <p className="small">
                📍 Kochi, Kerala, India <br />
                📞 +91 98765 43210 <br />
                📧 support@stepupfootwear.com
              </p>
            </div>
          </div>
          <hr className="border-light" />
          <p className="text-center small mb-0">© {new Date().getFullYear()} StepUp Footwear | All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
