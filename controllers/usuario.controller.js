const { Op } = require('sequelize');
const bcrypt = require('bcryptjs') ;
const { Usuario, Profesor, Coordinador, Nivel } = require('../models'); 
const crypto = require('crypto');

// Obtener todos los usuarios
exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      where: { 
                estado : {
                    [Op.not] : 2
                } 
      },
      // Incluye las asociaciones si quieres obtener datos relacionados
      include: [
        { model: Nivel, as: 'nivel' }
      ]
    });
    return res.status(200).json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return res.status(500).json({ message: 'Error interno del servidor al obtener usuarios.' });
  }
};

// Obtener un usuario por ID
exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      include: [
        { model: Profesor, as: 'profesor' },
        { model: Coordinador, as: 'coordinador' }
      ]
    });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    return res.status(200).json(usuario);
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    return res.status(500).json({ message: 'Error interno del servidor al obtener usuario.' });
  }
};

// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
  try {
    // Aquí se encripta la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUsuario = await Usuario.create({
      username: req.body.username,
      password: hashedPassword,
      estado: 1,            
      perfil: req.body.perfil,
      profesor_id: req.body.profesor_id,
      coordinador_id: req.body.coordinador_id,
      nivel_id : req.body.nivel_id
    });
    return res.status(201).json(newUsuario);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return res.status(500).json({ message: 'Error interno del servidor al crear usuario.' });
  }
};

// Actualizar un usuario existente
exports.updateUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    await usuario.update(req.body); // Actualiza con los datos del cuerpo de la solicitud
    return res.status(200).json(usuario);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    return res.status(500).json({ message: 'Error interno del servidor al actualizar usuario.' });
  }
};

// Eliminar un usuario
exports.deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    await usuario.update({estado : 2}); // Elimina el registro
    return res.status(204).send(); // 204 No Content para eliminación exitosa
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    return res.status(500).json({ message: 'Error interno del servidor al eliminar usuario.' });
  }
};