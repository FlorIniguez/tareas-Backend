const server = require ('./server/server.js')
require('dotenv').config()
require("./db/db.js" )


const PORT = process.env.PORT || 5000;
server.listen (8080,()=>{
    console.log(`server on port ${PORT}`)
})