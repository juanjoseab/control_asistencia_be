const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

module.exports = (sequelize) => {
  const ProfesorAsistencia = sequelize.define('ProfesorAsistencia', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED, // BIGINT(20) unsigned en SQL
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    profesor_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      // La clave foránea se define a nivel de asociación
    },
    fecha: {
      type: DataTypes.DATE, // DATETIME en SQL
      allowNull: false,
    },
    ausente: {
      type: DataTypes.TEXT('tiny'), // TINYTEXT en SQL
      defaultValue: '0', // DEFAULT '0' en SQL
      comment: 'Bandera para saber si el profesor se ausento',
    },
    motivo_ausencia: {
      type: DataTypes.TEXT, // TEXT en SQL
      allowNull: true, // DEFAULT NULL en SQL
    },
    tarde: {
      type: DataTypes.BOOLEAN, // TINYINT(4) en SQL se mapea a BOOLEAN en Sequelize
      allowNull: true, // DEFAULT NULL en SQL
      comment: 'si el profesor se presento tarde',
    },
    motivo_tarde: {
      type: DataTypes.TEXT('medium'), // MEDIUMTEXT en SQL
      allowNull: true, // DEFAULT NULL en SQL
      comment: 'motivo de ingreso tarde',
    },
    uniforme_incompleto: {
      type: DataTypes.BOOLEAN, // TINYINT(4) en SQL se mapea a BOOLEAN en Sequelize
      allowNull: true, // DEFAULT NULL en SQL
      comment: 'Si no cumple con el uniforme',
    },
    coordinador_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true, // DEFAULT NULL en SQL
      // La clave foránea se define a nivel de asociación
    },
  }, {
    tableName: 'profesor_asistencia', // Asegúrate de que el nombre de la tabla en la base de datos sea 'profesor_asistencia'
    timestamps: false, // Deshabilita los timestamps automáticos (createdAt, updatedAt) de Sequelize
    underscored: true, // Útil si tus nombres de columnas en la DB usan snake_case
  });

  // Definición de las asociaciones (claves foráneas)
  // Asume que tienes modelos 'Profesor' y 'Coordinador' definidos en otros archivos
  ProfesorAsistencia.associate = (models) => {
    ProfesorAsistencia.belongsTo(models.Profesor, {
      foreignKey: 'profesor_id', // La columna en la tabla `profesor_asistencia`
      targetKey: 'id',          // La columna en la tabla `profesor`
      as: 'profesor',           // Un alias para cuando incluyas el profesor en tus consultas
    });

    ProfesorAsistencia.belongsTo(models.Coordinador, {
      foreignKey: 'coordinador_id', // La columna en la tabla `profesor_asistencia`
      targetKey: 'id',             // La columna en la tabla `coordinador`
      as: 'coordinador',           // Un alias para cuando incluyas el coordinador en tus consultas
    });
  };

  return ProfesorAsistencia;
};