// src/Website/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Optional: If you want to style the Navbar

const Navbar = () => {
  return (
    <nav>
      <ul className="navbar">
        <li>
          <Link to="/landing">Main</Link> {/* Link to the landing page */}
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
      </ul>
    </nav>
  );
};

export default Navbar;
