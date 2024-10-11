import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './Website/LoginPage.jsx';
import LandingPage from './Website/LandingPage.jsx';
import Characters from './Components/Characters.jsx';
import MySubmissions from './Components/MySubmissions.jsx';
import Plots from './Components/Plots.jsx';
import Theme from './Components/Theme.jsx';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  return (
    <Router>
      <div className="app-container">
        <Routes>

          <Route
            path="/login"
            element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} />}
          />

          {isLoggedIn ? (
            <>
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/characters" element={<Characters userId={userId} />} />
              <Route path="/mysubmissions" element={<MySubmissions userId={userId} />} />
              <Route path="/plots" element={<Plots userId={userId} />} />
              <Route path="/theme" element={<Theme userId={userId} />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}

          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/landing" /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
