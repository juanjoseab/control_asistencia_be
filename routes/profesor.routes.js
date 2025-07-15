const express = require('express');
const router = express.Router();
const profesorController = require('../controllers/profesor.controller');


router.get('/', profesorController.getAllProfesores);
router.post('/', profesorController.createProfesor);
router.delete('/:id', profesorController.deleteProfesor);

module.exports = router;