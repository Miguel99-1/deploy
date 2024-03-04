// App.jsx
import React from "react";
import { BrowserRouter as  Router, Routes, Route, Navigate} from "react-router-dom";
import RegisterPage from "./components/RegisterPage.js";
import LoginPage from "./components/LoginPage.js";
import HomePage from "./components/HomePage.js";



const App = () => {
  return (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={<LoginPage/>}
          />
          <Route
            path="/register"
            element={ <RegisterPage/>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
  };

export default App;
