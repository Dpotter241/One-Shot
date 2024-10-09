import React, { useEffect, useState } from 'react';
import NavBar from '../Website/Navbar'; 
import './MySubmissions.css';

const MySubmissions = ({ userId }) => {
  const [submissions, setSubmissions] = useState({
    times: [],
    genres: [],
    subgenres: [],
    characters: [],
    plots: [],
  });

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
        <ul>
          {submissions.plots.map((plot) => (
            <li key={plot.id}>{plot.plot}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MySubmissions;
