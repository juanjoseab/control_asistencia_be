const { Nivel, Grado, Alumno } = require('../models'); 

exports.getAllAlumnos = async (req, res) => {
    try {
        const grado = await Alumno.findAll({
              // Incluye las asociaciones si quieres obtener datos relacionados              
            });
        return res.status(200).json(grado);
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor', error: error.message, err : error });
    }
}

exports.createAlumno = async (req, res) => {
    try {
        const newAlumno = await Alumno.create({
            "nombre" : req.body.nombre,
            "email" : req.body.email,
            "encargados": req.body.encargados,
            "telefono_encargados": req.body.telefono_encargados,
            "email_encargado": req.body.email_encargado,
            "grado_id" : req.body.grado_id,            
            "estado" : 1

        })
        return res.status(200).json(newAlumno);
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor', error: error.message, err : error });
    }
    
}


exports.deleteAlumno = async (req, res) => {
    try {
        const alumno = await Alumno.findByPk(req.params.id);
        if (!alumno) {
            return res.status(404).json({ message: 'Nivel no encontrado.' });
        }

        await alumno.update({"estado" : 2}); // Elimina el registro
        return res.status(204).send(alumno); // 204 No Content para eliminación exitosa
    } catch (error) {
        console.error('Error al eliminar alumno:', error);
        return res.status(500).json({ message: 'Error interno del servidor al eliminar alumno.' });
    }
    
}

