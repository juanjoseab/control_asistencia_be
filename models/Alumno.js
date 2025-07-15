const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

module.exports = (sequelize) => {
  const Alumno = sequelize.define('Alumno', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED, // BIGINT(20) unsigned en SQL
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: 'identificador unico para la tabla alumno',
    },
    nombre: {
      type: DataTypes.STRING(256),
      allowNull: false,
      comment: 'Nombre del alumno',
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: true, // DEFAULT NULL en SQL
      comment: 'Correo electronico del alumno',
    },
    encargados: {
      type: DataTypes.STRING(256),
      allowNull: false,
      comment: 'Nombre de los encargados',
    },
    telefono_encargados: {
      type: DataTypes.STRING(256),
      allowNull: false,
      comment: 'telefonos de contacto de los encargados',
    },
    email_encargado: {
      type: DataTypes.STRING(158),
      allowNull: false,
      comment: 'emails de los encargados',
    },
    grado_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true, // DEFAULT NULL en SQL
      comment: 'Identificador del grado al que pertece el alumno',
      // La clave foránea se define a nivel de asociación
    },
    estado: {
      type: DataTypes.BOOLEAN, // TINYINT(4) en SQL se mapea a BOOLEAN en Sequelize
      defaultValue: true, // DEFAULT 1 en SQL
      comment: 'estado del alumno 0 = inactivo, 1, activo, 2 = eliminado',
    },
  }, {
    tableName: 'alumno', // Asegúrate de que el nombre de la tabla en la base de datos sea 'alumno'
    timestamps: false, // Deshabilita los timestamps automáticos (createdAt, updatedAt) de Sequelize
    underscored: true, // Útil si tus nombres de columnas en la DB usan snake_case
  });

  // Definición de la asociación (clave foránea)
  // Asume que tienes el modelo 'Grado' definido en otro archivo
  Alumno.associate = (models) => {
    Alumno.belongsTo(models.Grado, {
      foreignKey: 'grado_id', // La columna en la tabla `alumno`
      targetKey: 'id',        // La columna en la tabla `grado`
      as: 'grado',            // Un alias para cuando incluyas el grado en tus consultas
    });
  };

  return Alumno;
};