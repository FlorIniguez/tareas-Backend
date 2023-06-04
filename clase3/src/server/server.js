const express = require('express');
const router = require('../routes/routes.js');
const getHourMiddleware = require('../utils/getHourMiddleware.js');
const server = express();


//middlewares
server.use(express.json());
server.use('/api', router)
server.use(getHourMiddleware);

server.get('/',(req,res)=>{
    res.send('Servidor de la clase funcionando')
})


module.exports = server;