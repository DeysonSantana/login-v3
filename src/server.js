// server.js (Arquivo principal do servidor)
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const { initDatabase } = require("./config/database.js");

const app = express();

// Inicializar banco de dados
initDatabase();

// Middlewares globais
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("src/public"))

// Rotas
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// Inicialização do servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));