const express = require('express');
const router = express.Router();
const userController = require('../controllers/usuario.controller');

router.post('/', userController.createUsuario);
router.get('/', userController.getAllUsuarios);
router.delete('/:id', userController.deleteUsuario);

module.exports = router;