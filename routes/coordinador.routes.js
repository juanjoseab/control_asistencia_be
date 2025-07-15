const express = require('express');
const router = express.Router();
const coordinadorController = require('../controllers/coordinador.controller');


router.get('/', coordinadorController.getAllCoordinadores);
router.post('/', coordinadorController.createCoordinador);
router.delete('/:id', coordinadorController.deleteCoordinador);

module.exports = router;