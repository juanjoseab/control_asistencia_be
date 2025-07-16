const { where } = require('sequelize');
const { Nivel, Grado, Alumno, Notificacion } = require('../models'); 

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

exports.getAlumnoPorId = async (req, res) => {
    try {
        const alumno = await Alumno.findOne({
            where : {
                id : req.params.id
            }
        });
        return res.status(200).send(alumno); // 204 No Content para eliminación exitosa
    } catch (error) {
        console.error('Error: ', error);
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

exports.getAlumnoNotificaciones = async (req, res) => {
    let notificaciones = [];
    try {
        notificaciones = await Notificacion.findAll(
            {
                where : {
                    alumno_id : req.params.id
                }
            }
        );

        if (!notificaciones) {
            return res.status(404).json({ message: 'Notificaciones no encontradas.' });
        }

        return res.status(200).send(notificaciones); // 204 No Content para eliminación exitosa
    } catch (error) {
        console.error('Error al buscar notificaciones:', error);
        return res.status(500).json({ message: 'Error interno buscar las notificaciones.' });
    }

}

