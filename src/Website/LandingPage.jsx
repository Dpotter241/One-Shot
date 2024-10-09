// src/Website/LandingPage.jsx
import React from 'react';
import NavBar from './Navbar.jsx'; // Include NavBar here

const LandingPage = () => {
  return (
    <>
      <NavBar /> {/* Navbar only shows on the Landing Page */}
      <h1>Welcome to the Landing Page</h1>
      {/* Other landing page content */}
    </>
  );
};

export default LandingPage;
