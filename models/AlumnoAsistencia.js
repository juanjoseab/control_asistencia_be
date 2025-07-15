const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

module.exports = (sequelize) => {
  const AlumnoAsistencia = sequelize.define('AlumnoAsistencia', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED, // BIGINT(20) unsigned en SQL
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    alumno_id: {
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
    grado_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      // La clave foránea se define a nivel de asociación
    },
    asistencia_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      // La clave foránea se define a nivel de asociación
    },
  }, {
    tableName: 'alumno_asistencia', // Asegúrate de que el nombre de la tabla en la base de datos sea 'alumno_asistencia'
    timestamps: false, // Deshabilita los timestamps automáticos (createdAt, updatedAt) de Sequelize
    underscored: true, // Útil si tus nombres de columnas en la DB usan snake_case
  });

  // Definición de las asociaciones (claves foráneas)
  // Asume que tienes modelos 'Alumno' y 'Grado' definidos en otros archivos
  AlumnoAsistencia.associate = (models) => {
    AlumnoAsistencia.belongsTo(models.Alumno, {
      foreignKey: 'alumno_id', // La columna en la tabla `alumno_asistencia`
      targetKey: 'id',          // La columna en la tabla `alumno`
      as: 'alumno',             // Un alias para cuando incluyas el alumno en tus consultas
    });

    AlumnoAsistencia.belongsTo(models.Grado, {
      foreignKey: 'grado_id', // La columna en la tabla `alumno_asistencia`
      targetKey: 'id',        // La columna en la tabla `grado`
      as: 'grado',            // Un alias para cuando incluyas el grado en tus consultas
    });

  };

  return AlumnoAsistencia;
};
