import React from 'react';

const Card = ({ image, title, price }) => {
  return (
    <>
      <div className="card border-0 shadow-sm h-100 text-center product-card">
        <img src={image} className="card-img-top product-image" alt={title} />
        <div className="card-body">
          <h5 className="card-title product-title">{title}</h5>
          <p className="product-price">₹ {price.toLocaleString()}</p>
        </div>
      </div>

      <style>{`
        .product-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 12px;
        }

        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .product-image {
          height: 240px;
          object-fit: cover;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
        }

        .product-title {
          font-size: 1.05rem;
          font-weight: 500;
          color: #00334e;
          margin-bottom: 6px;
        }

        .product-price {
          font-size: 1.1rem;
          font-weight: 600;
          color: #e74c3c;
        }
      `}</style>
    </>
  );
};

export default Card;
