const express = require('express');
const router = require('../routes/routes.js');
const server = express();

server.use(express.json());
server.use('/routers', router)

server.get('/',(req,res)=>{
    res.send('Servidor de la clase funcionando')
})
module.exports = server;