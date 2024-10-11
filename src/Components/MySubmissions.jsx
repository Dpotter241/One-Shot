import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Website/NavBar'; 
import './MySubmissions.css';

const MySubmissions = ({ userId }) => {
  const [submissions, setSubmissions] = useState({
    times: [],
    genres: [],
    subgenres: [],
    characters: [],
    plots: [],
  });
  const [selectedPlot, setSelectedPlot] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const responses = await Promise.all([
          fetch(`http://localhost:8088/time?userId=${userId}`),
          fetch(`http://localhost:8088/genre?userId=${userId}`),
          fetch(`http://localhost:8088/subgenre?userId=${userId}`),
          fetch(`http://localhost:8088/characters?userId=${userId}`),
          fetch(`http://localhost:8088/plots?userId=${userId}`),
        ]);

        const [times, genres, subgenres, characters, plots] = await Promise.all(
          responses.map((response) => response.json())
        );

        setSubmissions({
          times,
          genres,
          subgenres,
          characters,
          plots,
        });
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
  }, [userId]);

  const handleEditPlot = () => {
    if (selectedPlot) {
      navigate(`/plots/${selectedPlot.id}/edit`);
    }
  };

  const handleDeletePlot = async () => {
    if (selectedPlot) {
      try {
        await fetch(`http://localhost:8088/plots/${selectedPlot.id}`, {
          method: 'DELETE',
        });

        setSubmissions((prevSubmissions) => ({
          ...prevSubmissions,
          plots: prevSubmissions.plots.filter((plot) => plot.id !== selectedPlot.id),
        }));

        setSelectedPlot(null);
      } catch (error) {
        console.error('Error deleting plot:', error);
      }
    }
  };

  return (
    <div className="submissions-container">
      <NavBar />
      <h2>My Submissions</h2>

      <div className="submission-category">
        <h3>Times Submitted:</h3>
        <ul>
          {submissions.times.map((time) => (
            <li key={time.id}>{time.time}</li>
          ))}
        </ul>
      </div>

      <div className="submission-category">
        <h3>Genres Submitted:</h3>
        <ul>
          {submissions.genres.map((genre) => (
            <li key={genre.id}>{genre.genre}</li>
          ))}
        </ul>
      </div>

      <div className="submission-category">
        <h3>SubGenres Submitted:</h3>
        <ul>
          {submissions.subgenres.map((subgenre) => (
            <li key={subgenre.id}>{subgenre.subgenre}</li>
          ))}
        </ul>
      </div>

      <div className="submission-category">
        <h3>Characters Submitted:</h3>
        <ul>
          {submissions.characters.map((character) => (
            <li key={character.id}>
              {character.charactername}: {character.characterdescription}
            </li>
          ))}
        </ul>
      </div>

      <div className="submission-category">
        <h3>Plots Submitted:</h3>

        {/* Dropdown for selecting a plot */}
        <select
          value={selectedPlot ? selectedPlot.id : ''}
          onChange={(e) => {
            const selectedId = parseInt(e.target.value);
            const plot = submissions.plots.find((plot) => plot.id === selectedId);
            setSelectedPlot(plot);
          }}
        >
          <option value="" disabled>Select a plot</option>
          {submissions.plots.map((plot) => (
            <option key={plot.id} value={plot.id}>
              {plot.plot}
            </option>
          ))}
        </select>

        {/* Display edit and delete buttons if a plot is selected */}
        {selectedPlot && (
          <div className="plot-actions">
            <button onClick={handleEditPlot}>Edit</button>
            <button onClick={handleDeletePlot}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MySubmissions;
