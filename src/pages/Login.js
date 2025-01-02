import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { login } from '../apis/auth';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);
  
    const handleSubmit = async (e) => {
      if (!processing) {
        e.preventDefault();
        try {
            const credentials = {
                email: email,
                password: password,
            };
            const response = await login(credentials);
            console.log('Login Response: ',response.data);
            if (response?.data?.access_token) {
                localStorage.setItem('token', response.data?.access_token);
                window.location.href = '/';
            }
        } catch (err) {
            setError('Invalid credentials');
        }
      }
    };
  
    return (
      <div className="container mt-5">
        <h2>Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button disabled={processing} type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }

  export default Login;