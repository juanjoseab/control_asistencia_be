const express = require('express');
const router = express.Router();
const alumnoController = require('../controllers/alumno.controller');


router.get('/', alumnoController.getAllAlumnos);
router.post('/', alumnoController.createAlumno);
router.delete('/:id', alumnoController.deleteAlumno);
//router.get('/:id/alumnos', alumnoController.getAllAlumnosGrado);

module.exports = router;