const express = require('express');
const router = require('../routes/autosRoutes');
const getHourMiddleware = require('../utils/getHourMiddleware.js');
const server = express();


//middlewares
server.use(express.json());
server.use(router)
server.use(getHourMiddleware);


module.exports = server;