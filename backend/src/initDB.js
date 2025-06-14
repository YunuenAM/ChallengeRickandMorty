const sequelize = require('./models/index');
const Character = require('./models/Character');

// Sincronizar modelos con la base de datos
async function initDB() {
  try {
    await sequelize.sync({ force: false }); // Cambia a true para borrar datos existentes
    console.log('Base de datos sincronizada');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
}

initDB();