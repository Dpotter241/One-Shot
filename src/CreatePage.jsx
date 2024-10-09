import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const newUser = { fullname, email, password };

    try {
      const response = await fetch('http://localhost:8088/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        navigate('/');
      } else {
        setError("Failed to sign up. Please try again.");
      }
    } catch (error) {
      setError("Error connecting to the server. Please try again later.");
    }
  };

  return (
    <div className="signup-page">
      <h2>Sign-up</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        </div>
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
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign-up</button>
      </form>
    </div>
  );
}

export default SignupPage;
