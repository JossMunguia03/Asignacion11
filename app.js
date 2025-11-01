require('dotenv').config();

const express = require('express');
const dotEnv = require('dotenv');
const app = express();

// Configurar dotenv
dotEnv.config();

// Middleware para parsear JSON
app.use(express.json());

// Middleware para parsear URL encoded
app.use(express.urlencoded({ extended: true }));

// Rutas públicas
const authRoutes = require('./routes/authRoutes');
app.use('/api/v1/auth', authRoutes);

// Rutas protegidas
const usuarioRoutes = require('./routes/usuarioRoutes');
app.use('/api/v1/usuarios', usuarioRoutes);

const categoriaRoutes = require('./routes/categoriaRoutes');
app.use('/api/v1/categorias', categoriaRoutes);

const fraseRoutes = require('./routes/fraseRoutes');
app.use('/api/v1/frases', fraseRoutes);

// Middleware de manejo de errores (debe ir al final)
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.json({
        mensaje: 'Bienvenido a la API REST de GratiDay',
        version: '1.0.0',
        endpoints: {
            autenticacion: '/api/v1/auth',
            usuarios: '/api/v1/usuarios',
            categorias: '/api/v1/categorias',
            frases: '/api/v1/frases'
        }
    });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        path: req.url
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
    console.log(`Ambiente: ${process.env.NODE_ENV || 'desarrollo'}`);
    console.log(`URL: http://localhost:${PORT}`);
});

