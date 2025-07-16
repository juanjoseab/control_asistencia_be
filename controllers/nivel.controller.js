const { Op } = require('sequelize');
const { Nivel, Grado, Usuario } = require('../models'); 


exports.getAllNiveles = async (req, res) => {
    try {
        let levels = [];
        const niveles = await Nivel.findAll({
            where: { 
                estado : {
                    [Op.not] : 2
                } 
            }
        });
        niveles.forEach( async (element, index, niveles) => {
            let level = {}
            level.id = element.id;
            level.nombre = element.nombre;
            level.estado = element.estado;
            console.log(level);
            level.grados = await Grado.findAll({ where: { nivel_id : element.id } });
            levels.push(level);
            console.log(level);
            if (index === niveles.length -1) {
                return res.status(200).json(levels);
            }
        });
        
        
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor', error: error.message, err : error });
    }
    
}

exports.getAllNivelesPorProfesorId = async (req, res) => {
    try {

        const profesor = await Usuario.findOne({
            where : {
                id : req.params.id
            }
        });

        console.log(profesor);

        if(profesor == null || typeof profesor.id == 'undefined' ) {
            return res.status(404).json({ message: 'Profesor no encontrado' })
        }


        let levels = [];
        const niveles = await Nivel.findAll({
            where: { 
                estado : {
                    [Op.not] : 2
                },
                id : profesor.nivel_id 
            }
        });
        niveles.forEach( async (element, index, niveles) => {
            let level = {}
            level.id = element.id;
            level.nombre = element.nombre;
            level.estado = element.estado;
            console.log(level);
            level.grados = await Grado.findAll({ where: { nivel_id : element.id } });
            levels.push(level);
            console.log(level);
            if (index === niveles.length -1) {
                return res.status(200).json(levels);
            }
        });
        
        
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor', error: error.message, err : error });
    }
    
}

exports.createNivel = async (req, res) => {
    try {
        const newNivel = await Nivel.create({
            "nombre" : req.body.nombre,            
            "estado" : 1

        })
        return res.status(200).json(newNivel);
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor', error: error.message, err : error });
    }
    
}

exports.deleteNivel = async (req, res) => {
    try {
        const nivel = await Nivel.findByPk(req.params.id);
        if (!nivel) {
            return res.status(404).json({ message: 'Nivel no encontrado.' });
        }

        await nivel.update({"estado" : 2}); // Elimina el registro
        return res.status(204).send(nivel); // 204 No Content para eliminación exitosa
    } catch (error) {
        console.error('Error al eliminar nivel:', error);
        return res.status(500).json({ message: 'Error interno del servidor al eliminar usuario.' });
    }
    
}

exports.getGradosPorNivelId = async (req, res) => {
    try {
        const grados = await Grado.findAll({
            where : {
                nivel_id : req.params.id,
                estado : {
                    [Op.not] : 2
                }
            }
        });
        return res.status(200).send(grados); // 204 No Content para eliminación exitosa
    } catch (error) {
        console.error('Error: ', error);
        return res.status(500).json({ message: 'Error en el servidor', error: error.message, err : error });
    }
    
}

exports.getNivelPorId = async (req, res) => {
    try {
        const nivel = await Nivel.findOne({
            where : {
                id : req.params.id
            }
        });
        return res.status(200).send(nivel); // 204 No Content para eliminación exitosa
    } catch (error) {
        console.error('Error: ', error);
        return res.status(500).json({ message: 'Error en el servidor', error: error.message, err : error });
    }
}