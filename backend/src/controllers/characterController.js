const { fetchCharacters } = require('../services/apiService');
const Character = require('../models/Character');

const syncCharacters = async (req, res) => {
  try {
    const apiCharacters = await fetchCharacters();
    
    // Guardar en la base de datos
    for (const char of apiCharacters) {
      await Character.findOrCreate({
        where: { apiId: char.id },
        defaults: {
          name: char.name,
          image_url: char.image,
          status: char.status,
          species: char.species,
          description: `Status: ${char.status}, Species: ${char.species}, Gender: ${char.gender}`
        }
      });
    }
    
    res.json({ message: 'Characters synchronized successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCharacters = async (req, res) => {
  try {
    const characters = await Character.findAll();
    res.json(characters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCharacterById = async (req, res) => {
  try {
    const character = await Character.findByPk(req.params.id);
    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }
    res.json(character);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  syncCharacters,
  getAllCharacters,
  getCharacterById
};