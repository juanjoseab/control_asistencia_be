const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
// const sequelize = require('../config/database'); // Asume que tienes tu instancia de Sequelize en un archivo de configuración

module.exports = (sequelize) => {
  const ProfesorNivel = sequelize.define('ProfesorNivel', {
    // No se define un 'id' auto-incrementable aquí porque es una tabla de unión
    // con una clave primaria compuesta por las claves foráneas.
    profesor_id: {
      type: DataTypes.BIGINT.UNSIGNED, // BIGINT(20) unsigned en SQL
      allowNull: false,
      primaryKey: true, // Parte de la clave primaria compuesta
      // La clave foránea se define a nivel de asociación
    },
    nivel_id: {
      type: DataTypes.BIGINT.UNSIGNED, // BIGINT(20) unsigned en SQL
      allowNull: false,
      primaryKey: true, // Parte de la clave primaria compuesta
      // La clave foránea se define a nivel de asociación
    },
  }, {
    tableName: 'profesor_nivel', // Asegúrate de que el nombre de la tabla en la base de datos sea 'profesor_nivel'
    timestamps: false, // Deshabilita los timestamps automáticos (createdAt, updatedAt) de Sequelize
    underscored: true, // Útil si tus nombres de columnas en la DB usan snake_case
    // Si la tabla de unión no tiene su propia columna 'id' y usa las FKs como PK,
    // puedes definir la clave primaria compuesta así:
    // No es necesario si usas through en las asociaciones Many-to-Many de Sequelize,
    // pero si lo defines como un modelo independiente, es útil.
    // primaryKey: ['profesor_id', 'nivel_id'] // Esto ya está implícito al poner primaryKey: true en cada columna
  });

  // Definición de las asociaciones (claves foráneas)
  // Asume que tienes modelos 'Profesor' y 'Nivel' definidos en otros archivos
  ProfesorNivel.associate = (models) => {
    ProfesorNivel.belongsTo(models.Profesor, {
      foreignKey: 'profesor_id', // La columna en la tabla `profesor_nivel`
      targetKey: 'id',          // La columna en la tabla `profesor`
      as: 'profesor',           // Un alias para cuando incluyas el profesor
    });

    ProfesorNivel.belongsTo(models.Nivel, {
      foreignKey: 'nivel_id', // La columna en la tabla `profesor_nivel`
      targetKey: 'id',        // La columna en la tabla `nivel`
      as: 'nivel',            // Un alias para cuando incluyas el nivel
    });

    // También puedes definir las relaciones Many-to-Many desde los modelos Profesor y Nivel
    // Profesor.belongsToMany(models.Nivel, {
    //   through: ProfesorNivel,
    //   foreignKey: 'profesor_id',
    //   otherKey: 'nivel_id',
    //   as: 'niveles',
    // });

    // Nivel.belongsToMany(models.Profesor, {
    //   through: ProfesorNivel,
    //   foreignKey: 'nivel_id',
    //   otherKey: 'profesor_id',
    //   as: 'profesores',
    // });
  };

  return ProfesorNivel;
};