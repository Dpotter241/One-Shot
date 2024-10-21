import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsLoggedIn, setUserId }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const postResponse = async (newUser) => {
    const response = await fetch('http://localhost:8088/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
 
    if (!response.ok) {
      throw new Error('Failed to sign up.');
    }

    return await response.json();
  };

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:8088/users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return await response.json();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSignUp) {
      const newUser = {
        name: fullName,
        email: email,
        password: password,
      };

      try {
        const userData = await postResponse(newUser);
        
        setUserId(userData.id);
        setIsLoggedIn(true);
        navigate('/landing');
      } catch (error) {
        console.error('Sign up error:', error);
        alert('An error occurred during sign-up. Please try again.');
      }
    } else {
      try {
        const users = await fetchUsers();
        const user = users.find((user) => user.email === email && user.password === password);

        if (!user) {
          alert('Invalid credentials. Please try again.');
          return;
        }

        setUserId(user.id);
        setIsLoggedIn(true);
        navigate('/landing');
      } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred while logging in. Please try again.');
      }
    }
  };

  return (
    <div className="app-container">
      <div className="auth-container">
      <h1>Ready for an adventure?</h1>
        <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div>
              <label>Full Name:</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}
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
