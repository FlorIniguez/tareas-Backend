//middleware
const getHourMiddleware = (req, res, netx) =>{
    const date= new Date()
    const hour = new Date().getHours();
    const minutes = new Date().getMinutes();
    console.log(`Registro de solicitud de tipo ${req.method} a las ${hour}:${minutes}`)
    netx();
}
module.exports = getHourMiddleware;