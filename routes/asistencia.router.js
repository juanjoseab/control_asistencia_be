const express = require('express');
const router = express.Router();
const asistenciaController = require('../controllers/asistencia.controller');


router.get('/:gradoid/:fecha', asistenciaController.getAsistencia);
router.post('/', asistenciaController.saveAlumnoAsistencia);
router.post('/notificar', asistenciaController.enviarNotificacion);
router.post('/notificarAll', asistenciaController.enviarNotificacionAll);



/*router.get('/:id', gradoController.getGrado);
router.post('/', gradoController.createGrado);
router.delete('/:id', gradoController.deleteGrado);
router.get('/:id/alumnos', gradoController.getAllAlumnosGrado);*/

module.exports = router;