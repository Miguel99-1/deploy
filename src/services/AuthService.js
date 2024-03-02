import React, { createContext, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
  const login = async (email, password) =>{
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message || 'Erro ao autenticar');
      }
    } catch (error) {
      console.error('Erro no login:', error.message);
      throw new Error('Erro ao autenticar');
    }
  }

  

  const register = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });


      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message || 'Erro ao autenticar');
      }
    } catch (error) {
      console.error('Erro no login:', error.message);
      throw new Error('Erro ao autenticar');
    }
  }

  return (
    <AuthContext.Provider value={{ login, register }}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthProvider; // remova o export do AuthContext
