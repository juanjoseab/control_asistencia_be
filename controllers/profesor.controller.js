const { Usuario, Profesor, Coordinador } = require('../models'); 

exports.getAllProfesores = async (req, res) => {
    try {
        const profesores = await Profesor.findAll();
        res.status(200).json(profesores);
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message, err : error });
    }
    
}

exports.createProfesor = async (req, res) => {
    try {
        const newProfesor = await Profesor.create({
            "nombre" : req.body.nombre,
            "email" : req.body.email,
            "telefono": req.body.telefono,
            "estado" : 1

        })
        res.status(200).json(newProfesor);
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message, err : error });
    }
    
}

exports.deleteProfesor = async (req, res) => {
    try {
        const profesor = await Profesor.findByPk(req.params.id);
        if (!profesor) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        await profesor.update({"estado" : 2}); // Elimina el registro
        res.status(204).send(profesor); // 204 No Content para eliminación exitosa
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor al eliminar usuario.' });
    }
    
}