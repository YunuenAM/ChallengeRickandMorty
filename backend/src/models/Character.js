const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Character = sequelize.define('Character', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    apiId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    species: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'Characters', // Asegura que el nombre de la tabla sea correcto
    timestamps: false // Opcional: si no quieres campos de createdAt/updatedAt
  });

  return Character;
};