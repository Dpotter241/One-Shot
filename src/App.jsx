// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './Website/LoginPage.jsx';
import LandingPage from './Website/LandingPage.jsx';
import Characters from './Components/Characters.jsx';
import MySubmissions from './Components/MySubmissions.jsx';
import Plots from './Components/Plots.jsx';
import Themes from './Components/Themes.jsx';
import './App.css'; // Importing the App.css for styling

function App() {
  // State to manage login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="app-container"> {/* Applying the app-container class */}
        <Routes>
          <Route
            path="/"
            element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
          />
          {/* Only show LandingPage if logged in */}
          {isLoggedIn && <Route path="/landing" element={<LandingPage />} />}
          {isLoggedIn && <Route path="/characters" element={<Characters />} />}
          {isLoggedIn && <Route path="/mysubmissions" element={<MySubmissions />} />}
          {isLoggedIn && <Route path="/plots" element={<Plots />} />}
          {isLoggedIn && <Route path="/themes" element={<Themes />} />}
          {/* Optionally, redirect to login if not authenticated */}
          {!isLoggedIn && <Route path="*" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
