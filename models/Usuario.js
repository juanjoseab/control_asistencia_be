const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const bcrypt = require('bcryptjs'); 


module.exports = (sequelize) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED, // BIGINT(20) unsigned en SQL
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: 'Llave primaria de la tabla usuario',
    },
    username: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true, // Define la restricción UNIQUE KEY `usuario_unique`
      comment: 'Nombre de usuario de las credenciales con las que se accede al sistema',
    },
    password: {
      type: DataTypes.STRING(512),
      allowNull: false,
      comment: 'Clave de las credenciales con las que se ingresa al sistema',
    },
    estado: {
      type: DataTypes.INTEGER.UNSIGNED, // INT(10) unsigned en SQL
      allowNull: false,
      defaultValue: 1, // DEFAULT 1 en SQL
      comment: 'estado del usuario, 1 = activo, 0 = inactivo, 2 = eliminado',
    },
    token: {
      type: DataTypes.TEXT('tiny'), // TINYTEXT en SQL
      allowNull: true, // DEFAULT NULL en SQL
      comment: 'Token que se crea al iniciar una sesion',
    },
    token_activo_hasta: {
      type: DataTypes.BIGINT.UNSIGNED, // BIGINT(20) unsigned en SQL
      allowNull: true, // DEFAULT NULL en SQL
      comment: 'tiempo hasta cuando el token de sesion estara activo y usable',
    },
    perfil: {
      type: DataTypes.STRING(100), // VARCHAR(100) en SQL. Si los valores son fijos, DataTypes.ENUM podría ser una alternativa.
      allowNull: false,
      comment: 'perfil del usuario, profesor, coordinado, administrador',
    },
    profesor_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true, // DEFAULT NULL en SQL
      // La clave foránea se define a nivel de asociación
    },
    coordinador_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true, // DEFAULT NULL en SQL
      // La clave foránea se define a nivel de asociación
    },
    reset_password: {
      type: DataTypes.INTEGER, // INT(10) unsigned en SQL
      allowNull: true,
      comment: 'Si el usuario solicito reiniciar la clave',
    },
    reset_password_token: {
      type: DataTypes.STRING(512),
      allowNull: true, // DEFAULT NULL en SQL
      comment: 'Token para validar la solicitud de reinicio de clave',
    },
    nivel_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true, // DEFAULT NULL en SQL
      // La clave foránea se define a nivel de asociación
    },
  }, {
    tableName: 'usuario', // Asegúrate de que el nombre de la tabla en la base de datos sea 'usuario'
    timestamps: false, // Deshabilita los timestamps automáticos (createdAt, updatedAt) de Sequelize
    underscored: true, // Si tus nombres de columnas en la DB usan snake_case (como profesor_id, coordinador_id)
                       // esto ayuda a mapearlos correctamente a camelCase en el modelo si lo deseas.
  });

  // Definición de las asociaciones (claves foráneas)  
  Usuario.associate = (models) => {
    Usuario.belongsTo(models.Profesor, {
      foreignKey: 'profesor_id', // La columna en la tabla `usuario`
      targetKey: 'id',          // La columna en la tabla `profesor`
      as: 'profesor',           // Un alias para cuando incluyas el profesor en tus consultas
    });

    Usuario.belongsTo(models.Coordinador, {
      foreignKey: 'coordinador_id', // La columna en la tabla `usuario`
      targetKey: 'id',             // La columna en la tabla `coordinador`
      as: 'coordinador',           // Un alias para cuando incluyas el coordinador en tus consultas
    });

    Usuario.belongsTo(models.Nivel, {
      foreignKey: 'nivel_id', // La columna en la tabla `usuario`
      targetKey: 'id',             // La columna en la tabla `nivel`
      as: 'nivel',           // Un alias para cuando incluyas el nivel en tus consultas
    });

  };

  // Método para comparar contraseñas
Usuario.prototype.validarPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

  return Usuario;
};
