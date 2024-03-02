import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link
} from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import { AuthProvider, useAuth } from "./services/AuthService";

function App() {
  const [user, setUser] = useState(null);
  const [setError] = useState('');

  const { login } = useAuth();
  const { register } = useAuth();

  const handleLogin = async (email, password, rolesid) => {
    try {
      const userData = await login(email, password, rolesid);
      setUser(userData); 
    } catch (error) {
      console.error(error.message);
      setError('Credenciais inválidas');
    }
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          Casamentoaaa
          <Link to="/register">Register</Link> {/* Botão de Registro */}
        </header>
        <Routes>
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/login" replace />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />
          <Route
          path="/register"
          element={
            user ? <Navigate to="/" replace /> : <RegisterPage onRegister={register} />
          }
        />
        </Routes>
      </div>
    </Router>
  );
}

const AuthenticatedApp = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AuthenticatedApp;
