// App.jsx
import React from "react";
import { BrowserRouter as  Router, Routes, Route, Navigate} from "react-router-dom";
import RegisterPage from "./components/RegisterPage.js";
import LoginPage from "./components/LoginPage.js";
import HomePage from "./components/HomePage.js";



const App = () => {
  return (
      <Router>
        {user && <Navbar user={user} onLogout={handleLogout} />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/api" element={<ApiPage />} />
          {user && (
            <>
              <Route path="/teams" element={<TeamsPage />} />
              <Route path="/season-games" element={<SeasonGamesPage />} />
              <Route path="/day-games" element={<DayGamesPage />} />
              <Route path="/players" element={<PlayersPage />} />
              <Route path="/standings" element={<StandingsPage />} />
            </>
          )}
          <Route
            path="/login"
            element={
              user ? <Navigate to="/" replace /> : <LoginPage onLogin={handleLogin} />
            }
          />
          <Route
            path="/register"
            element={
              user ? <Navigate to="/" replace /> : <RegisterPage onRegister={handleRegister} />
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    );
  };

export default App;
