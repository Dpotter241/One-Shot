import React, { useEffect, useState } from 'react';
import NavBar from '../Website/NavBar';
import './MySubmissions.css';

const MySubmissions = ({ userId }) => {
  const [submissions, setSubmissions] = useState({
    times: [],
    genres: [],
    subgenres: [], // Ensure this matches the structure
    characters: [],
    plots: [],
  });

  const [editingPlotId, setEditingPlotId] = useState(null);
  const [newPlot, setNewPlot] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSubmissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const responses = await Promise.all([
        fetch(`http://localhost:8088/time?userId=${userId}`),
        fetch(`http://localhost:8088/genre?userId=${userId}`),
        fetch(`http://localhost:8088/subGenre?userId=${userId}`), // Correct fetch for subgenres
        fetch(`http://localhost:8088/characters?userId=${userId}`),
        fetch(`http://localhost:8088/plots?userId=${userId}`),
      ]);

      const [times, genres, subgenres, characters, plots] = await Promise.all(
        responses.map((response) => response.json())
      );

      setSubmissions({
        times,
        genres,
        subgenres, // Ensure subgenres are correctly set
        characters,
        plots,
      });
    } catch (error) {
      console.error('Error fetching submissions:', error);
      setError('Failed to load submissions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [userId]);

  const handleEdit = (plot) => {
    setEditingPlotId(plot.id);
    setNewPlot(plot.plot);
  };

  const updatePlot = async (plotId) => {
    const response = await fetch(`http://localhost:8088/plots/${plotId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ plot: newPlot }),
    });

    if (response.ok) {
      const updatedPlots = submissions.plots.map((plot) =>
        plot.id === plotId ? { ...plot, plot: newPlot } : plot
      );
      setSubmissions((prev) => ({ ...prev, plots: updatedPlots }));
      setEditingPlotId(null);
      setNewPlot('');
    } else {
      console.error('Error updating plot:', response);
    }
  };

  const handleDelete = async (plotId) => {
    try {
      const response = await fetch(`http://localhost:8088/plots/${plotId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSubmissions((prev) => ({
          ...prev,
          plots: prev.plots.filter((plot) => plot.id !== plotId),
        }));
      } else {
        console.error('Error deleting plot:', response);
      }
    } catch (error) {
      console.error('Error deleting plot:', error);
    }
  };

  return (
    <div className="submissions-container">
      <NavBar />
      <h2>My Submissions</h2>

      {loading ? (
        <p>Loading submissions...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {Object.keys(submissions).some((key) => submissions[key].length > 0) ? (
            <>
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
                  {submissions.subgenres.map((subGenre) => ( // Use the correct key: subgenres
                    <li key={subGenre.id}>{subGenre.subGenre}</li>
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
                <ul>
                  {submissions.plots.map((plot) => (
                    <li key={plot.id}>
                      {editingPlotId === plot.id ? (
                        <>
                          <input
                            type="text"
                            value={newPlot}
                            onChange={(e) => setNewPlot(e.target.value)}
                            required
                          />
                          <button onClick={() => updatePlot(plot.id)}>Save</button>
                          <button onClick={() => setEditingPlotId(null)}>Cancel</button>
                        </>
                      ) : (
                        <>
                          {plot.plot}
                          <button onClick={() => handleEdit(plot)}>Edit</button>
                          <button onClick={() => handleDelete(plot.id)}>Delete</button>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <p>No submissions found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default MySubmissions;
