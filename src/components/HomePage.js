import React from "react";
import { BrowserRouter as Link } from "react-router-dom";
function HomePage() {
    return (
      <div>
        <h2>Home</h2>
        <p>Bem-vindo à página inicial.</p>
        <p>Por favor, escolha uma opção:</p>
        <ul>
          <li>
            <Link to="/register">Registrar</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    );
  }

export default HomePage;