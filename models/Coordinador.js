const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

module.exports = (sequelize) => {
  const Coordinador = sequelize.define('Coordinador', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED, // BIGINT(20) unsigned en SQL
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: 'llave primaria', // Comentario de la columna en SQL
    },
    nombre: {
      type: DataTypes.STRING(256),
      allowNull: false,
      comment: 'Nombre del profesor', // Comentario de la columna en SQL
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      comment: 'email del profesor', // Comentario de la columna en SQL
    },
    telefono: {
      type: DataTypes.STRING(100),
      allowNull: true, // DEFAULT NULL en SQL
      comment: 'telefonos de contacto', // Comentario de la columna en SQL
    },
    estado: {
      type: DataTypes.INTEGER.UNSIGNED, // INT(10) unsigned en SQL
      allowNull: false,
      defaultValue: 1, // DEFAULT 1 en SQL
      comment: 'estado del profesor', // Comentario de la columna en SQL
    },
  }, {
    tableName: 'coordinador', // Asegúrate de que el nombre de la tabla en la base de datos sea 'coordinador'
    timestamps: false, // Deshabilita los timestamps automáticos (createdAt, updatedAt) de Sequelize
    underscored: true, // Útil si tus nombres de columnas en la DB usan snake_case
  });

  // No hay asociaciones de clave foránea definidas en esta tabla según el SQL proporcionado.
  // Si en el futuro 'coordinador' tiene relaciones con otras tablas, las definirías aquí.
  // Coordinador.associate = (models) => {
  //   Coordinador.hasMany(models.AlgunOtroModelo, {
  //     foreignKey: 'coordinador_id',
  //     as: 'algunosOtrosModelos',
  //   });
  // };

  return Coordinador;
};