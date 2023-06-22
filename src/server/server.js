const express = require('express');
const usuarioRouter = require('../routes/usuario/usuarioRoutes');
const authRouter = require('../routes/auth/authRoutes');
const petsRouter = require('../routes/pet/petRoutes')
const routeError = require('../utils/middlewares/erroresMiddlewares');
const server = express();

//Recordemos, en server configuramos al servidor.
server.use(express.json());

server.use('/user', usuarioRouter)
server.use('/auth', authRouter)
server.use('/pet', petsRouter )
server.use(routeError);
module.exports = server;