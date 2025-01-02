import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { register } from '../apis/auth';

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [processing, setProcessing] = useState(false);
  
    const handleSubmit = async (e) => {
      if (!processing) {
        e.preventDefault();
        setProcessing(true);
        try {
            const payload = {
                name: name,
                email: email,
                password: password,
                password_confirmation: cpassword
            };
            await register(payload);
            alert('Registration successful');
            setProcessing(false);
            navigate('/login');
        } catch (err) {
            alert('Registration failed');
            setProcessing(false);
            console.error(err);
        }
      }
    };
  
    return (
      <div className="container mt-5">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
            </div>
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
            <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                type="password"
                className="form-control"
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
                required
                />
            </div>
          <button disabled={processing} type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    );
  }

export default Register;