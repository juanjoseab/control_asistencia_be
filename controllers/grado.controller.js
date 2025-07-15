const { Op, where } = require('sequelize');
const { Nivel, Grado, Alumno, AlumnoAsistencia } = require('../models'); 


exports.getAllGrados = async (req, res) => {
    try {
        const grado = await Grado.findAll({
            where: { 
                estado : {
                    [Op.not] : 2
                } 
            }
        });
        res.status(200).json(grado);
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message, err : error });
    }
}

exports.getGrado = async (req, res) => {
    try {
        const grado = await Grado.findOne({
            where: { 
                id : req.params.id
            }
        });
        return res.status(200).json(grado);
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor', error: error.message, err : error });
    }
}

exports.getAllAlumnosGrado = async (req, res) => {
    try {
        let today = new Date()
        let currentDate = today.toISOString().split('T')[0];
        let year = currentDate.split('-')[0];

        let initDate = year + '-01-01';
        let endDate = year + '-12-31';

        const grado = await Grado.findByPk(req.params.id, {});

        if(!grado) {
            return res.status(404).json({ message: 'Grado no encontrado.' });
        }

        const alumnos = await Alumno.findAll({ 
            where: { 
                grado_id : req.params.id,
                estado : {
                    [Op.not] : 2
                }
            } 
        });

        if(alumnos == null || alumnos.length < 1)  {
            return res.status(200).json([]);
        }

        let allAlumnos = [];

        alumnos.forEach( async (element, index, alumnos) => {
            
            const ausenciasCount = await AlumnoAsistencia.count( {
                where : {
                    alumno_id : element.id,
                    ausente : 1,
                    fecha : {
                        [Op.between]: [initDate, endDate]
                    }
                }
            } );

            element.total_ausencias = ausenciasCount;
            element.setDataValue('total_ausencias', ausenciasCount);

            const asistenciasCount = await AlumnoAsistencia.count( {
                where : {
                    alumno_id : element.id,
                    ausente : {
                        [Op.eq] : null
                    },
                    fecha : {
                        [Op.between] : [initDate, endDate]
                    }
                }
            } );

            element.total_asistencias = asistenciasCount;
            element.setDataValue('total_asistencias', asistenciasCount);
            allAlumnos.push(element);

            if( index === alumnos.length -1 ) {
                res.status(200).json(allAlumnos);
            }
        });

    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor', error: error.message, err : error });
    }
}

exports.createGrado = async (req, res) => {
    try {
        const newGrado = await Grado.create({
            "nombre" : req.body.nombre,
            "nivel_id": req.body.nivel_id,
            "estado" : 1

        })
        return res.status(200).json(newGrado);
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor', error: error.message, err : error });
    }
    
}

exports.deleteGrado = async (req, res) => {
    try {
        const grado = await Grado.findByPk(req.params.id);
        if (!grado) {
            return res.status(404).json({ message: 'Nivel no encontrado.' });
        }

        await grado.update({"estado" : 2}); // Elimina el registro
        return res.status(204).send(grado); // 204 No Content para eliminación exitosa
    } catch (error) {
        console.error('Error al eliminar grado:', error);
        return res.status(500).json({ message: 'Error interno del servidor al eliminar grado.' });
    }
    
}


exports.getAllAlumnosPorGradoId = async (req, res) => {
    let alumnos = [];
    try {
        alumnos = await Alumno.findAll({
            where: { 
                grado_id : req.params.id,
                estado : {
                    [Op.not] : 2
                } 
            }
        });        
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor', error: error.message, err : error });
    }

    return res.status(200).json(alumnos);
}