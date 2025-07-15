const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

module.exports = (sequelize) => {
  const Grado = sequelize.define('Grado', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED, // BIGINT(20) unsigned en SQL
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: 'llave primaria de la tabla grado',
    },
    nombre: {
      type: DataTypes.STRING(256),
      allowNull: false,
      comment: 'nombre del grado',
    },
    estado: {
      type: DataTypes.BOOLEAN, // TINYINT(4) en SQL se mapea a BOOLEAN en Sequelize
      allowNull: false,
      comment: 'Estado del grado',
    },
    nivel_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      comment: 'identificador unico del grado al que pertenece',
      // La clave foránea se define a nivel de asociación
    },
  }, {
    tableName: 'grado', // Asegúrate de que el nombre de la tabla en la base de datos sea 'grado'
    timestamps: false, // Deshabilita los timestamps automáticos (createdAt, updatedAt) de Sequelize
    underscored: true, // Útil si tus nombres de columnas en la DB usan snake_case
  });

  // Definición de la asociación (clave foránea)
  // Asume que tienes el modelo 'Nivel' definido en otro archivo
  Grado.associate = (models) => {
    Grado.belongsTo(models.Nivel, {
      foreignKey: 'nivel_id', // La columna en la tabla `grado`
      targetKey: 'id',        // La columna en la tabla `nivel`
      as: 'nivel',            // Un alias para cuando incluyas el nivel en tus consultas
    });
  };

  return Grado;
};