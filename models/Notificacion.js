const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

module.exports = (sequelize) => {
  const Notificacion = sequelize.define('Notificacion', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED, // BIGINT(20) unsigned en SQL
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: 'llave primaria de la tabla notificacion',
    },
    mensaje: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: 'mensaje de la notificacion',
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: 'Fecha en la que fue enviada la notificacion',
    },
    alumno_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      comment: 'identificador unico del alumno al que se envio la notificacion',
      // La clave foránea se define a nivel de asociación
    },
    email: {
      type: DataTypes.STRING(256),
      allowNull: false,
      comment: 'Correo al que se envio la notificacion',
    },
  }, {
    tableName: 'notificacion', // Asegúrate de que el nombre de la tabla en la base de datos sea 'grado'
    timestamps: false, // Deshabilita los timestamps automáticos (createdAt, updatedAt) de Sequelize
    underscored: true, // Útil si tus nombres de columnas en la DB usan snake_case
  });

  // Definición de la asociación (clave foránea)
  // Asume que tienes el modelo 'Nivel' definido en otro archivo
  Notificacion.associate = (models) => {
    Notificacion.belongsTo(models.Alumno, {
      foreignKey: 'notificacion_id', // La columna en la tabla `Notificacion`
      targetKey: 'id',        // La columna en la tabla `nivel`
      as: 'notificacion',            // Un alias para cuando incluyas el nivel en tus consultas
    });
  };

  return Notificacion;
};