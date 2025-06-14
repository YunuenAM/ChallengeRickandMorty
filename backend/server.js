
const { sequelize, initializeModels } = require('./src/models');
// Inicializa la base de datos al arrancar
async function initializeDatabase() {
  try {
    await initializeModels();
    console.log('Base de datos y tablas creadas correctamente');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  }
}

initializeDatabase();
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const charactersRouter = require('./src/routes/characters');
app.use('/api/characters', charactersRouter);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});