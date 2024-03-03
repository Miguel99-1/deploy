// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import RegisterPage from "components/RegisterPage.js";
import LoginPage from "components/LoginPage.js";
import HomePage from "components/HomePage.js";



function App() {
  return (
    <Router>
      <Routes>
      <div className="app">
      <Route path="/" element={<HomePage />} />
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
      </div>
      <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
