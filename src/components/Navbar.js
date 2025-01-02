import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ token, logout }) => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

  return (
    <>
      {/* Top Navbar */}
      <nav className="navbar navbar-light bg-light d-flex p-2 justify-content-start">
        {isSmallScreen && <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleSidebar}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon bg-light"></span>
        </button>}
        {isSmallScreen && <Link className="navbar-brand" to="/">
          News Aggregator
        </Link>}
        {!isSmallScreen && <div className='container-fluid justify-content-start'>
            <Link className="navbar-brand" to="/">
            News Aggregator
            </Link>
            <div className="d-flex justify-content-start">
                <ul className="navbar-nav me-auto d-flex special">
                    {token && <li className="nav-item">
                    <Link className="nav-link" to="/preferences">Preferences</Link>
                    </li>}
                    {!token && <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                    </li>}
                    {!token && <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                    </li>}
                    {token && <li className="nav-item">
                    <Link className="nav-link" onClick={logout}>Logout</Link>
                    </li>}
                </ul>
            </div>
        </div>}

      </nav>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <ul className="navbar-nav">
          {token && (
            <li className="nav-item">
              <Link className="nav-link" to="/preferences">
                Preferences
              </Link>
            </li>
          )}
          {!token && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
          {token && (
            <li className="nav-item">
              <Link className="nav-link" onClick={logout}>
                Logout
              </Link>
            </li>
          )}
        </ul>
      </div>

      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      {/* Styles */}
      <style jsx>{`
        .sidebar {
          position: fixed;
          top: 0;
          left: -250px;
          width: 250px;
          height: 100%;
          background: #f8f9fa;
          box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
          transition: left 0.3s ease;
          z-index: 1040;
          padding: 1rem;
        }
        
        .special {
         flex-direction: row;
         gap: 20px;
        }

        .sidebar.open {
          left: 0;
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1030;
        }

        .navbar-toggler {
          border: none;
        }

        .navbar-toggler-icon {
          width: 30px;
          height: 30px;
          background-color: #6c757d;
          display: block;
          border-radius: 5px;
        }
      `}</style>
    </>
  );
};

export default Navbar;
