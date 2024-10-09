// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './Website/LoginPage.jsx';
import LandingPage from './Website/LandingPage.jsx';
import Characters from './Components/Characters.jsx';
import MySubmissions from './Components/MySubmissions.jsx';
import Plots from './Components/Plots.jsx';
import Theme from './Components/Theme.jsx'; // Update import path if necessary
import './App.css'; // Importing the App.css for styling

function App() {
  // State to manage login status and user ID
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); // State for userId

  return (
    <Router>
      <div className="app-container"> {/* Applying the app-container class */}
        <Routes>
          <Route
            path="/"
            element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} />} // Assuming LoginPage can set userId
          />
          {isLoggedIn && <Route path="/landing" element={<LandingPage />} />}
          {isLoggedIn && <Route path="/characters" element={<Characters userId={userId} />} />} {/* Pass userId to Characters */}
          {isLoggedIn && <Route path="/mysubmissions" element={<MySubmissions />} />}
          {isLoggedIn && <Route path="/plots" element={<Plots />} />}
          {isLoggedIn && <Route path="/theme" element={<Theme userId={userId} />} />} {/* Pass userId to Theme */}
          {!isLoggedIn && <Route path="*" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
