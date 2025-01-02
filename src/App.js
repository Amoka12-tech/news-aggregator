import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewsFeed from './pages/NewsFeed';
import Preferences from './pages/Preferences';
import Login from './pages/Login';
import Register from './pages/Register';
import { logout_api } from './apis/auth';
import Navbar from './components/Navbar';

function App() {
  const [token, setToken] = React.useState(null);
  const localToken = localStorage.getItem('token');

  const getToken = () => {
    try {
      const localToken = localStorage.getItem('token');
      console.log('found token: ',localToken);
      setToken(localToken);
    } catch (error) {
      console.log('Unable to get token: ',error);
    }
  };

  const logout = async () => {
    try {
      await logout_api();
      localStorage.clear();
      window.location.href = '/';
    } catch (error) {
      alert('Login failed, try again!');
      console.log('Unable to get token: ',error);
    }
  };

  React.useEffect(() => {
    getToken();
  }, [localToken]);
  return (
    <Router>

      <Navbar token={token} logout={logout} />
      
      <Routes>
        <Route path="/" element={<NewsFeed />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
