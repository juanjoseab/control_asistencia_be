const express = require('express');
const router = express.Router();
const gradoController = require('../controllers/grado.controller');


router.get('/', gradoController.getAllGrados);
router.get('/:id', gradoController.getGrado);
router.post('/', gradoController.createGrado);
router.delete('/:id', gradoController.deleteGrado);
router.get('/:id/alumnos', gradoController.getAllAlumnosGrado);

module.exports = router;