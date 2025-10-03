import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  function attemptLogin() {
    const user = { email, password };

    axios.post('http://127.0.0.1:8000/api/login/', user)
      .then(response => {
        setErrorMessage('');
        localStorage.setItem('token', response.data.token);

        alert("Login successful!");
        navigate('/home');
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Login failed. Please try again.');
        }
      });
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4 rounded-3" style={{ width: "400px" }}>
        <h2 className="text-center mb-4"> Login</h2>

        {errorMessage && (
          <div className="alert alert-danger text-center">{errorMessage}</div>
        )}

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
          <label className="fw-semibold">Password</label>
          <input
            type="password"
            className="form-control rounded-pill"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <button
          className="btn btn-primary w-100 rounded-pill mt-2"
          onClick={attemptLogin}
        >
          Login
        </button>

        <p className="text-center mt-3 mb-0">
          Don’t have an account? <a href="/signup" className="text-decoration-none">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
