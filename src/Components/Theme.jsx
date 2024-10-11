import React, { useState } from 'react';
import NavBar from '../Website/NavBar';
import './Theme.css';

const Theme = ({ userId }) => {
  const [time, setTime] = useState('');
  const [genre, setGenre] = useState('');
  const [subGenre, setSubGenre] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const sendTime = async () => {
      try {
        const response = await fetch('http://localhost:8088/time', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ time, userId }),
        });

        if (!response.ok) {
          throw new Error('Error submitting time');
        }
      } catch (error) {
        console.error(error);
        alert('Error submitting time');
      }
    };

    const sendGenre = async () => {
      try {
        const response = await fetch('http://localhost:8088/genre', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ genre, userId }),
        });

        if (!response.ok) {
          throw new Error('Error submitting genre');
        }
      } catch (error) {
        console.error(error);
        alert('Error submitting genre');
      }
    };

    const sendSubGenre = async () => {
      try {
        const response = await fetch('http://localhost:8088/subgenre', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ subGenre, userId }),
        });

        if (!response.ok) {
          throw new Error('Error submitting subgenre');
        }
      } catch (error) {
        console.error(error);
        alert('Error submitting subgenre');
      }
    };

    await Promise.all([sendTime(), sendGenre(), sendSubGenre()]);

    setTime('');
    setGenre('');
    setSubGenre('');

    alert('Theme successfully added!');
  };

  return (
    <div className="theme-container">
      <NavBar />
      <h2>Add a New Theme</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="time">Time Period:</label>
          <input
            type="text"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

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
