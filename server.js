require('dotenv').config(); // Carga las variables de entorno desde .env
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { connectDB, sequelize } = require('./models'); // Importa la conexión y los modelos
const app = express();
const PORT = process.env.PORT || 3000;

const authRoutes = require('./routes/auth.routes'); 
const usuarioRoutes = require('./routes/usuario.routes'); 
const coordinadorRoutes = require('./routes/coordinador.routes');
const profesorRoutes = require('./routes/profesor.routes');
const nivelRoutes = require('./routes/nivel.routes');
const gradoRoutes = require('./routes/grado.routes');
const alumnoRoutes = require('./routes/alumno.routes');
const asistenciaRoutes = require('./routes/asistencia.router');

const { sendEmail } = require('./utils/sendmail.util');



// 🛡️ Middleware de seguridad CORS
app.use(cors({
  origin: [    
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    'https://backend-asistencia2-2.onrender.com',
    '*'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 🧠 Middleware para leer JSON
app.use(express.json({ limit: '5mb' }));

// 📜 Middleware para logs HTTP
app.use(morgan('dev'));



app.get('/', async (req, res) => {

  await sendEmail('juanjoseab@gmail.com', 'PRUEBA DE ENVIO DE CORREO', 'Enviando un correo');

  res.send('✅ API Asistencia funcionando');
});

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/coordinadores', coordinadorRoutes);
app.use('/api/profesores', profesorRoutes);
app.use('/api/niveles', nivelRoutes);
app.use('/api/grados', gradoRoutes);
app.use('/api/alumnos', alumnoRoutes);
app.use('/api/asistencias', asistenciaRoutes);


// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});