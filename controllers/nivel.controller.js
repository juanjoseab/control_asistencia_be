const { Op } = require('sequelize');
const { Nivel, Grado } = require('../models'); 


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
                res.status(200).json(levels);
            }
        });
        
        
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message, err : error });
    }
    
}

exports.createNivel = async (req, res) => {
    try {
        const newNivel = await Nivel.create({
            "nombre" : req.body.nombre,            
            "estado" : 1

        })
        res.status(200).json(newNivel);
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message, err : error });
    }
    
}

exports.deleteNivel = async (req, res) => {
    try {
        const nivel = await Nivel.findByPk(req.params.id);
        if (!nivel) {
            return res.status(404).json({ message: 'Nivel no encontrado.' });
        }

        await nivel.update({"estado" : 2}); // Elimina el registro
        res.status(204).send(nivel); // 204 No Content para eliminación exitosa
    } catch (error) {
        console.error('Error al eliminar nivel:', error);
        res.status(500).json({ message: 'Error interno del servidor al eliminar usuario.' });
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
        res.status(200).send(grados); // 204 No Content para eliminación exitosa
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message, err : error });
    }
    
}

exports.getNivelPorId = async (req, res) => {
    try {
        const nivel = await Nivel.findOne({
            where : {
                id : req.params.id
            }
        });
        res.status(200).send(nivel); // 204 No Content para eliminación exitosa
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message, err : error });
    }
}