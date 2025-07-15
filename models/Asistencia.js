const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');


module.exports = (sequelize) => {
  const Asistencia = sequelize.define('Asistencia', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED, // BIGINT(20) unsigned en SQL
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: 'llave primaria de la tabla Asistencia',
    },
    grado_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      comment: 'id del grado',
    },
    fecha: {
      type: DataTypes.DATEONLY, // Usamos DATEONLY para mapear a `date` sin información de tiempo
      allowNull: false,
    },
  }, {
    tableName: 'asistencia', // Asegúrate de que el nombre de la tabla en la base de datos sea 'grado'
    timestamps: false, // Deshabilita los timestamps automáticos (createdAt, updatedAt) de Sequelize
    underscored: true, // Útil si tus nombres de columnas en la DB usan snake_case
  });

  // Definición de la asociación (clave foránea)
  // Asume que tienes el modelo 'Nivel' definido en otro archivo
  Asistencia.associate = (models) => {
    Asistencia.belongsTo(models.Grado, {
      foreignKey: 'grado_id', // La columna en la tabla `asistencia`
      targetKey: 'id',        // La columna en la tabla `grado`
      as: 'grado',            // Un alias para cuando incluyas el nivel en tus consultas
    });
  };

  return Asistencia;
};

