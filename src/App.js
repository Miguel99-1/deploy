import React from "react";
import { Router, Route, Navigate, Router } from "react-router-dom";
import RegisterPage from "./components/RegisterPage.js";
import LoginPage from "./components/LoginPage.js";
import HomePage from "./components/HomePage.js";

const App = () => {
  return (
    <Router>
    <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/login" />} />
      </Router>
  );
}

export default App;
