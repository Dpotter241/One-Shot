import React, { useState } from 'react';
import NavBar from '../Website/NavBar'; 
import './Characters.css';

const Characters = ({ userId }) => {

  const [characterName, setCharacterName] = useState('');
  const [characterDescription, setCharacterDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const characterData = {
      charactername: characterName,
      characterdescription: characterDescription,
      userId,
    };

    try {
      const response = await fetch('http://localhost:8088/characters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(characterData),
      });

      if (!response.ok) {
        throw new Error('Error submitting character');
      }

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
      <NavBar />
      <h2>Add a New Character</h2>
      <form onSubmit={handleSubmit}>
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
