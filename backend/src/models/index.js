const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../database.sqlite'), // Ruta absoluta
  logging: false // Desactiva los logs de SQL en consola
});

// Función para inicializar modelos
const initializeModels = async () => {
  const Character = require('./Character')(sequelize);
  
  // Sincroniza los modelos con la base de datos
  await sequelize.sync({ force: true }); // force: true solo en desarrollo!
  
  return { Character };
};

module.exports = {
  sequelize,
  initializeModels
};