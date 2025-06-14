const express = require('express');
const router = express.Router();
const {
  syncCharacters,
  getAllCharacters,
  getCharacterById
} = require('../controllers/characterController');

// Sincronizar personajes con la API externa
router.get('/sync', syncCharacters);

// Obtener todos los personajes
router.get('/', getAllCharacters);

// Obtener un personaje por ID
router.get('/:id', getCharacterById);

module.exports = router;