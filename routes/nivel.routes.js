const express = require('express');
const router = express.Router();
const nivelController = require('../controllers/nivel.controller');


router.get('/', nivelController.getAllNiveles);
router.get('/:id', nivelController.getNivelPorId);
router.get('/:id/grados', nivelController.getGradosPorNivelId);

router.post('/', nivelController.createNivel);
router.delete('/:id', nivelController.deleteNivel);

module.exports = router;