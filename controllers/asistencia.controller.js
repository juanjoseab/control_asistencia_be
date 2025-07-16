const { Op } = require('sequelize');
const { Nivel, Grado, Alumno, Asistencia, AlumnoAsistencia, Notificacion } = require('../models'); 
const { sendEmail } = require('../utils/sendmail.util');


exports.getAsistencia = async (req, res) => {
    try {
        
        console.log({
            fecha : req.params.fecha,
            grado_id : req.params.gradoid
        });

        let asistencia = await Asistencia.findAll({
            where : {
                fecha : req.params.fecha,
                grado_id : req.params.gradoid
            }
        });

        console.log(asistencia);

        if(asistencia !== null && Array.isArray(asistencia) && asistencia.length > 0) {
            let asistencias = await AlumnoAsistencia.findAll({
                where : {
                    asistencia_id : asistencia[0].id
                }
            });
            return res.status(200).json({
                asistencia : asistencia[0],
                asistencias : asistencias
            });
        } else {
            asistencia = await Asistencia.create({
                grado_id : req.params.gradoid,
                fecha : req.params.fecha
            })
            return res.status(200).json({
                asistencia : asistencia,
                asistencias : []
            });
        }

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error en el servidor', error: error.message, err : error });
    }
    
}


exports.saveAlumnoAsistencia = async (req, res) => {
    try {

        let asistenciaAlumno = await AlumnoAsistencia.findOne({
            where : {
                asistencia_id : req.body.asistencia_id,
                alumno_id : req.body.alumno_id                
            }
        });

        

        if( asistenciaAlumno !== null ) {
            console.log(asistenciaAlumno);
            let data = {
                ausente : req.body.ausente,
                tarde : req.body.tarde,
                uniforme_incompleto : req.body.uniforme_incompleto
            }

            await asistenciaAlumno.update(data);            
        } else {
            asistenciaAlumno = await AlumnoAsistencia.create({
                fecha : req.body.fecha,
                asistencia_id : req.body.asistencia_id,
                alumno_id : req.body.alumno_id,
                grado_id : req.body.grado_id,
                ausente : req.body.ausente,
                tarde : req.body.tarde,
                uniforme_incompleto : req.body.uniforme_incompleto
            });
        }
        return res.status(200).json(asistenciaAlumno);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error en el servidor', error: error.message, err : error });
    }
    
}

exports.enviarNotificacion = async (req, res) => {

    try {
        let today = new Date()
        let currentDate = today.toISOString().split('T')[0];

        let alumno = await Alumno.findOne({
            where : {
                id : req.body.alumno_id
            }
        });

        if(alumno === null) {
            return res.status(404).json({ message: 'Alumno no encontrado', error: error.message, err : error });
        }

        let email = '';
        if(alumno.email) {
            await sendEmail(alumno.email, "NOTIFICACION DESDE EL CONTROL DE ASISTENCIA", req.body.mensaje);
            email = alumno.email;
        }
        
        if(alumno.email_encargado) {
            await sendEmail(alumno.email_encargado, "NOTIFICACION DESDE EL CONTROL DE ASISTENCIA", req.body.mensaje);
            email = email + ',' + alumno.email_encargado;
        }

        let notificacion = await Notificacion.create({
            mensaje : req.body.mensaje,
            fecha : currentDate,
            alumno_id : req.body.alumno_id,
            email : email
        });

        return res.status(200).json(notificacion);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error en el servidor', error: error.message, err : error });
    }


    

    //sendEmail
}

exports.enviarNotificacionAll = async (req, res) => {

    try {
        let today = new Date()
        let currentDate = today.toISOString().split('T')[0];

        let alumnos = await Alumno.findAll({
            where : {
                grado_id : req.body.grado_id
            }
        });

        if(alumnos === null || alumnos.length < 1) {
            return res.status(404).json({ message: 'Alumnos no encontrados', error: error.message, err : error });
        }

        for(let i = 0; i < alumnos.length; i++) {
            let alumno = alumnos[i];
            let email = '';
            if(alumno.email) {
                await sendEmail(alumno.email, "NOTIFICACION DESDE EL CONTROL DE ASISTENCIA", req.body.mensaje);
                email = alumno.email;
            }
            
            if(alumno.email_encargado) {
                await sendEmail(alumno.email_encargado, "NOTIFICACION DESDE EL CONTROL DE ASISTENCIA", req.body.mensaje);
                email = email + ',' + alumno.email_encargado;
            }

            let notif = await Notificacion.create({
                mensaje : req.body.mensaje,
                fecha : currentDate,
                alumno_id : alumno.id,
                email : email
            });

            console.log(notif);

            if(i == alumnos.length -1) {
                return res.status(200).json({ message: 'notificaciones enviadas' });
            }

        }

        
        //return res.status(200).json({ message: 'notificaciones enviadas' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error en el servidor', error: error.message, err : error });
    }
}