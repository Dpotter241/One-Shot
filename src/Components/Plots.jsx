import React, { useState } from 'react';
import NavBar from '../Website/NavBar'; 
import './Plots.css'; 

const Plots = ({ userId }) => {

  const [plot, setPlot] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const plotData = {
      id: Date.now(),
      plot,
      userId,
    };

    try {
      const response = await fetch('http://localhost:8088/plots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(plotData),
      });

      if (!response.ok) {
        throw new Error('Error submitting plot');
      }

      setPlot('');
      alert('Plot successfully added!');
    } catch (error) {
      console.error(error);
      alert('Error submitting plot');
    }
  };

  return (
    <div className="plots-container">
      <NavBar /> 
      <h2>Add a New Plot</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="plot">Plot:</label>
          <textarea
            id="plot"
            value={plot}
            onChange={(e) => setPlot(e.target.value)}
            required
            rows="6" 
          />
        </div>
        <button type="submit">Submit Plot</button>
      </form>
    </div>
  );
};

export default Plots;
