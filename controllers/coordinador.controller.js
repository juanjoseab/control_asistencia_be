const bcrypt = require('bcryptjs') ;
const { Usuario, Profesor, Coordinador } = require('../models'); 

exports.getAllCoordinadores = async (req, res) => {
    try {
        const coordinadores = await Coordinador.findAll();
        res.status(200).json(coordinadores);
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message, err : error });
    }
    
}

exports.createCoordinador = async (req, res) => {
    try {
        const newCoordinador = await Coordinador.create({
            "nombre" : req.body.nombre,
            "email" : req.body.email,
            "telefono": req.body.telefono,
            "estado" : 1

        })
        res.status(200).json(newCoordinador);
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message, err : error });
    }
    
}

exports.deleteCoordinador = async (req, res) => {
    try {
        const coordinador = await Coordinador.findByPk(req.params.id);
        if (!coordinador) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        await coordinador.update({"estado" : 2}); // Elimina el registro
        res.status(204).send(coordinador); // 204 No Content para eliminación exitosa
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor al eliminar usuario.' });
    }
    
}