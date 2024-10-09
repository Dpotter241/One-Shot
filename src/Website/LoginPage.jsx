// src/SignUpLoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsLoggedIn, setUserId }) => { // Add setUserId as a prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Fetch users from the API
      const response = await fetch('http://localhost:8088/users');

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const users = await response.json();

      // Find a user that matches the provided email and password
      const user = users.find((user) => user.email === email && user.password === password);

      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Set the user ID in the app's state
      setUserId(user.id);
      setIsLoggedIn(true);
      navigate('/landing');
    } catch (error) {
      console.error(error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="app-container">
      <div className="auth-container">
        <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
        </form>
        <button
          className="toggle-button"
          onClick={() => setIsSignUp((prev) => !prev)}
        >
          {isSignUp
            ? 'Already have an account? Login'
            : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
