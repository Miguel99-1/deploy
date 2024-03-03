// Register.js
import React, { useState } from "react";
import axios from "axios";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const baseUrl = "https://api-register-users-1ype.vercel.app";

  const handleRegister = async () => {
    if (!name || !email) {
      return alert("Preencha os campos!");
    }

    const data = { name, email };

    try {
      await axios.post(`${baseUrl}/users`, data);
      alert("Usuário registrado com sucesso!");
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      alert("Erro ao registrar usuário. Por favor, tente novamente mais tarde.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default RegisterPage;
