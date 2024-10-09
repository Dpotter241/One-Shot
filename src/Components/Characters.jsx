// src/Components/Characters.jsx
import React, { useState } from 'react';
import NavBar from '../Website/Navbar'; // Ensure the import path is correct
import './Characters.css'; // You may want to create a separate CSS file for styling

const Characters = ({ userId }) => {
  // State for the input values
  const [characterName, setCharacterName] = useState('');
  const [characterDescription, setCharacterDescription] = useState('');

  // Function to handle the API post request
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create the character object, including the userId of the logged-in user
    const characterData = {
      charactername: characterName,
      characterdescription: characterDescription,
      userId, // This will be the userId of the logged-in user
    };

    try {
      const response = await fetch('http://localhost:8088/characters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(characterData), // Send character data
      });

      if (!response.ok) {
        throw new Error('Error submitting character');
      }

      // Reset form fields after successful submission
      setCharacterName('');
      setCharacterDescription('');

      alert('Character successfully added!');
    } catch (error) {
      console.error(error);
      alert('Error submitting character');
    }
  };

  return (
    <div className="characters-container">
      <NavBar /> {/* Add the NavBar component here */}
      <h2>Add a New Character</h2>
      <form onSubmit={handleSubmit}>
        {/* Character Name Input */}
        <div>
          <label htmlFor="characterName">Character Name:</label>
          <input
            type="text"
            id="characterName"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            required
          />
        </div>

        {/* Character Description Input */}
        <div>
          <label htmlFor="characterDescription">Character Description:</label>
          <textarea
            id="characterDescription"
            value={characterDescription}
            onChange={(e) => setCharacterDescription(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit Character</button>
      </form>
    </div>
  );
};

export default Characters;
