require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false // Deshabilita el logging de SQL en consola
    }
);

// Función para probar la conexión a la base de datos
async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida correctamente.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
        process.exit(1); // Sale de la aplicación si no puede conectar
    }
}

module.exports = { sequelize, connectDB };