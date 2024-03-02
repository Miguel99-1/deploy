const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 8000;

// Configuração do banco de dados
const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // Seu nome de usuário
  database: "casamento",
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  } else {
    console.log("Conectado ao banco de dados");
  }
});


app.use(cors());  // Adicione esta linha
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log('Tentativa de login:', email);
    const query = `SELECT * FROM users WHERE email = '${email}'`;
  
    connection.query(query, async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao autenticar' });
        }
  
        if (results.length > 0) {
            const user = results[0];
            const passwordMatch = await bcrypt.compare(password, user.password);
  
            if (passwordMatch) {
                res.json({ user });
            } else {
                res.status(401).json({ message: 'Credenciais inválidas' });
            }
        } else {
            res.status(401).json({ message: 'Credenciais inválidas' });
        }
    });
  });

  app.post('/register', async (req, res) => {
    const { email, password } = req.body;
  
    // Verificar se o email já está em uso
    const emailCheckQuery = 'SELECT * FROM users WHERE email = ?';
  
    connection.query(emailCheckQuery, [email], async (emailCheckErr, emailCheckResults) => {
      if (emailCheckErr) {
        return res.status(500).json({ message: 'Erro ao verificar email' });
      }
  
      if (emailCheckResults.length > 0) {
        return res.status(400).json({ message: 'Email já registrado' });
      }
  
      // Se o email não estiver em uso, proceder com o registro
      try {
        const hashedPassword = await bcrypt.hash(password, 10); // 10 é o número de rounds de hashing
        const registerQuery = 'INSERT INTO users (email, password, rolesid) VALUES (?, ?, 2)';
  
        connection.query(registerQuery, [email, hashedPassword], (registerErr, registerResults) => {
          if (registerErr) {
            return res.status(500).json({ message: 'Erro ao registrar' });
          }
  
          const userId = registerResults.insertId;
          res.json({ user: { id: userId, email, rolesid: 2 } });
        });
      } catch (registerError) {
        console.error(registerError);
        res.status(500).json({ message: 'Erro ao registrar' });
      }
    });
  });
  
  
  
  // Inicie o servidor
  app.listen(PORT, () => {
    console.log(`Servidor backend rodando na porta ${PORT}`);
  });
  