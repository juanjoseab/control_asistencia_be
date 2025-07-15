const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcryptjs');
const crypto = require('crypto');
const pool = require('../config/db');
const { Usuario } = require('../models'); 

// 🔐 Login de usuario
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { username : username } });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        //const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const esValida = await usuario.validarPassword(password);
        if (!esValida) {
            return res.status(401).json({ message: 'Contraseña incorrecta.' });
        }

        // Generar JWT
        const sesion_token = generarClaveSecreta(128);
        await usuario.update({ token : sesion_token });
        const token = jwt.sign(
            { id: usuario.id, rol: usuario.perfil, user_token : sesion_token },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expira en 1 hora
        );

        res.status(200).json({ message: 'Login exitoso', token, rol: usuario.rol, userId: usuario.id_usuario });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear coordinador', error: error.message });
    }
};


// 🔁 Recuperación de contraseña
exports.forgotPassword = async (req, res) => {
    const { correo } = req.body;

    if (!correo) {
        return res.status(400).json({ message: 'Correo requerido' });
    }

    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);

        if (rows.length === 0) {
            console.warn('⚠️ Correo no encontrado:', correo);
            return res.status(404).json({ message: 'Correo no encontrado' });
        }

        // Aquí podrías enviar un correo real con un token o enlace si se conecta SMTP
        console.log('📨 Enlace de recuperación simulado enviado a:', correo);
        res.json({ message: 'Enlace de recuperación enviado (simulado)' });
    } catch (err) {
        console.error('❌ Error al procesar recuperación:', err);
        res.status(500).json({ message: 'Error al enviar enlace', error: err.message });
    }
};

const  generarClaveSecreta = (longitud) => {
  return crypto.randomBytes(Math.ceil(longitud/2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0, longitud);
}