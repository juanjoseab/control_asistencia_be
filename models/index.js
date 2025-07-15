const { Sequelize } = require('sequelize');
const { sequelize } = require('../config/db'); // Importa la instancia de Sequelize

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Importa todos tus modelos
db.Usuario = require('./Usuario')(sequelize);
db.Coordinador = require('./Coordinador')(sequelize);
db.Nivel = require('./Nivel')(sequelize);
db.Profesor = require('./Profesor')(sequelize);
db.Grado = require('./Grado')(sequelize);
db.ProfesorAsistencia = require('./ProfesorAsistencia')(sequelize);
db.ProfesorNivel = require('./ProfesorNivel')(sequelize); // Tabla de unión
db.Alumno = require('./Alumno')(sequelize);
db.Asistencia = require('./Asistencia')(sequelize);
db.AlumnoAsistencia = require('./AlumnoAsistencia')(sequelize);
db.Notificacion = require('./Notificacion')(sequelize);


// Define las asociaciones entre los modelos
// Es crucial llamar a .associate() después de que todos los modelos han sido cargados
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
