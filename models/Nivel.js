const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

module.exports = (sequelize) => {
  const Nivel = sequelize.define('Nivel', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED, // BIGINT(20) unsigned en SQL
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(256),
      allowNull: true, // DEFAULT NULL en SQL
      comment: 'Nombre del nivel',
    },
    estado: {
      type: DataTypes.BOOLEAN, // TINYINT(4) en SQL se mapea a BOOLEAN en Sequelize
      allowNull: true, // DEFAULT NULL en SQL
      comment: 'estado del nivel',
    },
  }, {
    tableName: 'nivel', // Asegúrate de que el nombre de la tabla en la base de datos sea 'nivel'
    timestamps: false, // Deshabilita los timestamps automáticos (createdAt, updatedAt) de Sequelize
    underscored: true, // Útil si tus nombres de columnas en la DB usan snake_case
  });

  // No hay asociaciones de clave foránea definidas en esta tabla según el SQL proporcionado.
  // Si en el futuro 'nivel' tiene relaciones con otras tablas, las definirías aquí.
  // Nivel.associate = (models) => {
  //   Nivel.hasMany(models.AlgunOtroModelo, {
  //     foreignKey: 'nivel_id',
  //     as: 'algunosOtrosModelos',
  //   });
  // };

  return Nivel;
};