const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: 'Token no proporcionado.' });
    }

    const token = authHeader.split(' ')[1]; // Espera "Bearer TOKEN"
    if (!token) {
        return res.status(403).json({ message: 'Formato de token inválido.' });
    }

    try {
        // Verifica el token usando la clave secreta del entorno
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Adjunta la información del usuario (id, rol) al objeto de la solicitud
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado.' });
    }
};

exports.checkRole = (rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.user || !rolesPermitidos.includes(req.user.rol)) {
            return res.status(403).json({ message: 'Acceso denegado. No tienes los permisos necesarios.' });
        }
        next();
    };
};