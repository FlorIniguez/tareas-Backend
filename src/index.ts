import  { Response,Request } from 'express';
import server from './server'
require ('dotenv').config;
import './config'

const PORT = 8080;


server.listen(PORT,()=>{
    console.log(`Server listening on ${PORT}`);
})