import React from 'react';

const Landing = () => {
  const landingStyle = {
    height: '100vh',
    backgroundImage: 'url("/bg.jpg")', 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
    padding: '20px',
    backdropFilter: 'brightness(0.6)' 
  };

  const headingStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)'
  };

  const paragraphStyle = {
    fontSize: '1.25rem',
    marginBottom: '2rem',
    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)'
  };

  const buttonStyle = {
    padding: '12px 30px',
    fontSize: '1.1rem',
    backgroundColor: '#ffffff',
    color: '#000',
    border: 'none',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: '600'
  };

  return (
    <div style={landingStyle}>
      <h1 style={headingStyle}>Welcome to Our Footwear Store </h1>
      <p style={paragraphStyle}>Discover the perfect pair for every step!</p>
      <a href="/home" style={buttonStyle}>Shop Now</a>
    </div>
  );
};

export default Landing;
