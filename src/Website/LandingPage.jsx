// src/Website/LandingPage.jsx
import React, { useEffect, useState } from 'react';
import NavBar from './Navbar.jsx'; // Include NavBar here
import './LandingPage.css'; // Import the CSS file

const LandingPage = () => {
  const [timeOptions, setTimeOptions] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);
  const [subgenreOptions, setSubgenreOptions] = useState([]);
  const [characterOptions, setCharacterOptions] = useState([]);
  const [archetypeOptions, setArchetypeOptions] = useState([]);
  const [plotOptions, setPlotOptions] = useState([]);

  useEffect(() => {
    // Fetch options for the selects from your API endpoints
    const fetchData = async () => {
      try {
        const [timeData, genreData, subgenreData, characterData, archetypeData, plotData] = await Promise.all([
          fetch('http://localhost:8088/time').then(res => res.json()),
          fetch('http://localhost:8088/genre').then(res => res.json()),
          fetch('http://localhost:8088/subgenre').then(res => res.json()),
          fetch('http://localhost:8088/characters').then(res => res.json()),
          fetch('http://localhost:8088/archetype').then(res => res.json()),
          fetch('http://localhost:8088/plots').then(res => res.json()),
        ]);

        setTimeOptions(timeData);
        setGenreOptions(genreData);
        setSubgenreOptions(subgenreData);
        setCharacterOptions(characterData);
        setArchetypeOptions(archetypeData);
        setPlotOptions(plotData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Get selected values
    const selectedTime = event.target.timeSelect.value;
    const selectedGenre = event.target.genreSelect.value;
    const selectedSubgenre = event.target.subgenreSelect.value;
    const selectedCharacter = event.target.characterSelect.value;
    const selectedArchetype = event.target.archetypeSelect.value;
    const selectedPlot = event.target.plotSelect.value;

    // Display selected information in a popup (alert)
    alert(`Character Created!\n
      Time: ${selectedTime}\n
      Genre: ${selectedGenre}\n
      Subgenre: ${selectedSubgenre}\n
      Character: ${selectedCharacter}\n
      Archetype: ${selectedArchetype}\n
      Plot: ${selectedPlot}`);
  };

  return (
    <div className="landing-page">
      <NavBar />
      <h1>It's Adventure Time!</h1>

      <form id="characterForm" onSubmit={handleSubmit}> {/* Add onSubmit handler */}
        <label htmlFor="timeSelect">Choose Time:</label>
        <select id="timeSelect">
          {timeOptions.map(option => (
            <option key={option.id} value={option.time}>{option.time}</option>
          ))}
        </select>

        <label htmlFor="genreSelect">Choose Genre:</label>
        <select id="genreSelect">
          {genreOptions.map(option => (
            <option key={option.id} value={option.genre}>{option.genre}</option>
          ))}
        </select>

        <label htmlFor="subgenreSelect">Choose Subgenre:</label>
        <select id="subgenreSelect">
          {subgenreOptions.map(option => (
            <option key={option.id} value={option.subgenre}>{option.subgenre}</option>
          ))}
        </select>

        <label htmlFor="characterSelect">Choose Character:</label>
        <select id="characterSelect">
          {characterOptions.map(option => (
            <option key={option.id} value={option.charactername}>{option.charactername}</option>
          ))}
        </select>

        <label htmlFor="archetypeSelect">Choose Archetype:</label>
        <select id="archetypeSelect">
          {archetypeOptions.map(option => (
            <option key={option.id} value={option.Villain}>{option.Villain}</option> // Adjust as needed
          ))}
        </select>

        <label htmlFor="plotSelect">Choose Plot:</label>
        <select id="plotSelect">
          {plotOptions.map(option => (
            <option key={option.id} value={option.plot}>{option.plot}</option>
          ))}
        </select>

        <button type="submit">Create Adventure</button>
      </form>
    </div>
  );
};

export default LandingPage;
