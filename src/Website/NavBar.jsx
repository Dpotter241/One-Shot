import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {

    localStorage.removeItem('authToken');

    navigate('/login');
  };

  return (
    <nav>
      <ul className="navbar">
        <li>
          <Link to="/landing">Main</Link>
        </li>
        <li>
          <Link to="/theme">Theme</Link>
        </li>
        <li>
          <Link to="/characters">Characters</Link>
        </li>
        <li>
          <Link to="/plots">Plots</Link>
        </li>
        <li>
          <Link to="/mysubmissions">My Submissions</Link>
        </li>
        <li>
          <button className="sign-out-btn" onClick={handleSignOut}>
            Sign Out
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
