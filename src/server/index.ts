import express, { Response,Request } from 'express';
import router from '../routes/productRouter';


const server = express();
server.use(express.json());
server.get('/', (req: Request,res:Response)=> {
    res.send('Hello World!');
   })
   server.use('/product', router)
   export default server