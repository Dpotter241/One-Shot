import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function MainPage() {
  return (
    <div className="main-page">
      <header>
        <h1>Adventure Time</h1>
        <nav>
          <ul>
            <li><Link to="/themes">Themes</Link></li>
            <li><Link to="/characters">Characters</Link></li>
            <li><Link to="/plots">Plots</Link></li>
            <li><Link to="/my-submissions">My Submissions</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        {/* Outlet will render the component for the selected route */}
        <Outlet />
      </main>
    </div>
  );
}

export default MainPage;
