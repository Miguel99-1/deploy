// Login.js
import React, { useState } from "react";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const baseUrl = "https://api-register-users-1ype.vercel.app"; // URL da sua API de login

  const handleLogin = async () => {
    if (!email || !password) {
      return alert("Preencha todos os campos!");
    }

    const data = { email, password };

    try {
      const response = await axios.post(`${baseUrl}/login`, data);
      // Aqui você pode lidar com a resposta da API, como armazenar o token de autenticação, etc.
      console.log("Login realizado com sucesso!", response.data);
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      alert("Erro ao realizar login. Verifique suas credenciais e tente novamente.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
