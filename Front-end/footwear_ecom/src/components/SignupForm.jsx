import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  function Signupuser() {
    if (password !== passwordConf) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const user = { name, email, address, password, password_confirmation: passwordConf };

    axios.post('http://127.0.0.1:8000/signup/', user)
      .then(response => {
        setErrorMessage('');
        alert('Registration successful!');
        navigate('/login');
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Registration failed. Please try again.');
        }
      });
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4 rounded-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4"> Sign Up</h2>

        {errorMessage && (
          <div className="alert alert-danger text-center">{errorMessage}</div>
        )}

        <div className="form-group mb-3">
          <label className="fw-semibold">Full Name</label>
          <input
            type="text"
            className="form-control rounded-pill"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group mb-3">
          <label className="fw-semibold">Email</label>
          <input
            type="email"
            className="form-control rounded-pill"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group mb-3">
          <label className="fw-semibold">Address</label>
          <input
            type="text"
            className="form-control rounded-pill"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
          />
        </div>

        <div className="form-group mb-3">
          <label className="fw-semibold">Password</label>
          <input
            type="password"
            className="form-control rounded-pill"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        <div className="form-group mb-3">
          <label className="fw-semibold">Confirm Password</label>
          <input
            type="password"
            className="form-control rounded-pill"
            value={passwordConf}
            onChange={(e) => setPasswordConf(e.target.value)}
            placeholder="Confirm password"
          />
        </div>

        <button
          className="btn btn-primary w-100 rounded-pill mt-2"
          onClick={Signupuser}
        >
          Create Account
        </button>

        <p className="text-center mt-3 mb-0">
          Already have an account?{" "}
          <a href="/login" className="text-decoration-none">Login</a>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;
