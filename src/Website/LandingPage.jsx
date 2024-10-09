import React, { useEffect, useState } from 'react';
import NavBar from './NavBar.jsx';
import './LandingPage.css';

const LandingPage = () => {
  const [timeOptions, setTimeOptions] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);
  const [subgenreOptions, setSubgenreOptions] = useState([]);
  const [characterOptions, setCharacterOptions] = useState([]);
  const [plotOptions, setPlotOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [adventureDetails, setAdventureDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [timeData, genreData, subgenreData, characterData, plotData] = await Promise.all([
          fetch('http://localhost:8088/time').then(res => res.json()),
          fetch('http://localhost:8088/genre').then(res => res.json()),
          fetch('http://localhost:8088/subgenre').then(res => res.json()),
          fetch('http://localhost:8088/characters').then(res => res.json()),
          fetch('http://localhost:8088/plots').then(res => res.json()),
        ]);

        setTimeOptions(timeData);
        setGenreOptions(genreData);
        setSubgenreOptions(subgenreData);
        setCharacterOptions(characterData);
        setPlotOptions(plotData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedTime = event.target.timeSelect.value;
    const selectedGenre = event.target.genreSelect.value;
    const selectedSubgenre = event.target.subgenreSelect.value;
    const selectedCharacterId = parseInt(event.target.characterSelect.value);
    const selectedPlot = event.target.plotSelect.value;

    const selectedCharacter = characterOptions.find(
      (char) => char.id === selectedCharacterId
    );

    if (selectedCharacter) {
      setAdventureDetails({
        time: selectedTime,
        genre: selectedGenre,
        subgenre: selectedSubgenre,
        character: selectedCharacter.charactername,
        plot: selectedPlot,
        characterDescription: selectedCharacter.characterdescription,
      });

      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="landing-page">
      <NavBar />
      <h1>It's Adventure Time!</h1>

      <form id="characterForm" onSubmit={handleSubmit}>
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
            <option key={option.id} value={option.id}>{option.charactername}</option>
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

      {showModal && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <h2>Your Adventure Details</h2>
              <p>Your adventure will take place in a {adventureDetails.time} setting!</p>
              <p>It is a {adventureDetails.genre} theme with elements of {adventureDetails.subgenre}!</p>
              <p>The plot of your adventure will be "{adventureDetails.plot}".</p>
              <p>The party will be aided or hampered by {adventureDetails.character} who is {adventureDetails.characterDescription}.</p>
              <p>Happy adventuring hero!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
