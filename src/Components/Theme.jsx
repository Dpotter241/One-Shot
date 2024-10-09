// src/Components/Theme.jsx
import React, { useState } from 'react';
import NavBar from '../Website/Navbar'; // Ensure the import path is correct
import './Theme.css';

const Theme = ({ userId }) => {
  // State for the input values
  const [time, setTime] = useState('');
  const [genre, setGenre] = useState('');
  const [subGenre, setSubGenre] = useState('');

  // Function to handle the API post requests
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create the theme object
    const themeData = {
      userId, // Include userId
    };

    // Send "Time" to its respective endpoint
    const sendTime = async () => {
      try {
        const response = await fetch('http://localhost:8088/time', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ time, userId }), // Include userId here
        });

        if (!response.ok) {
          throw new Error('Error submitting time');
        }
      } catch (error) {
        console.error(error);
        alert('Error submitting time');
      }
    };

    // Send "Genre" to its respective endpoint
    const sendGenre = async () => {
      try {
        const response = await fetch('http://localhost:8088/genre', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ genre, userId }), // Include userId here
        });

        if (!response.ok) {
          throw new Error('Error submitting genre');
        }
      } catch (error) {
        console.error(error);
        alert('Error submitting genre');
      }
    };

    // Send "SubGenre" to its respective endpoint
    const sendSubGenre = async () => {
      try {
        const response = await fetch('http://localhost:8088/subgenre', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ subGenre, userId }), // Include userId here
        });

        if (!response.ok) {
          throw new Error('Error submitting subgenre');
        }
      } catch (error) {
        console.error(error);
        alert('Error submitting subgenre');
      }
    };

    // Call the functions to send data to the respective endpoints
    await sendTime();
    await sendGenre();
    await sendSubGenre();

    // Reset form fields after successful submission
    setTime('');
    setGenre('');
    setSubGenre('');

    alert('Theme successfully added!');
  };

  return (
    <div className="theme-container">
      <NavBar /> {/* Add the NavBar component here */}
      <h2>Add a New Theme</h2>
      <form onSubmit={handleSubmit}>
        {/* Time Input */}
        <div>
          <label htmlFor="time">Time:</label>
          <input
            type="text"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        {/* Genre Input */}
        <div>
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>

        {/* SubGenre Input */}
        <div>
          <label htmlFor="subGenre">SubGenre:</label>
          <input
            type="text"
            id="subGenre"
            value={subGenre}
            onChange={(e) => setSubGenre(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit Theme</button>
      </form>
    </div>
  );
};

export default Theme;
