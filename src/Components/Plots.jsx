import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../Website/NavBar'; 
import './Plots.css'; 

const Plots = ({ userId }) => {
  const [plot, setPlot] = useState('');
  const { plotId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (plotId) {
      const fetchPlot = async () => {
        try {
          const response = await fetch(`http://localhost:8088/plots/${plotId}`);
          const data = await response.json();
          setPlot(data.plot);
        } catch (error) {
          console.error('Error fetching plot:', error);
        }
      };

      fetchPlot();
    }
  }, [plotId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const plotData = {
      plot,
      userId,
    };

    try {
      let response;
      if (plotId) {
        response = await fetch(`http://localhost:8088/plots/${plotId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(plotData),
        });
      } else {
        plotData.id = Date.now();
        response = await fetch('http://localhost:8088/plots', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(plotData),
        });
      }

      if (!response.ok) {
        throw new Error('Error submitting plot');
      }

      setPlot('');
      alert(`Plot ${plotId ? 'updated' : 'added'} successfully!`);
      navigate('/mysubmissions');
    } catch (error) {
      console.error(error);
      alert(`Error ${plotId ? 'updating' : 'submitting'} plot`);
    }
  };

  return (
    <div className="plots-container">
      <NavBar /> 
      <h2>{plotId ? 'Edit Plot' : 'Add a New Plot'}</h2>
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
        <button type="submit">{plotId ? 'Update Plot' : 'Submit Plot'}</button>
      </form>
    </div>
  );
};

export default Plots;
