const express = require('express') //requiero el modulo express
const app = express(); //llamo su funcion guardandolo en constante
const PORT = 8080;
//metodos que va a tener el servidor
app.get ('/', (request, response) => { //get espera un parametro y callback
    response.send ('Bienvenidos a mi primer server')
})
app.get ('/primer-server', (request, response) => {
    response.send('Primer server')
    console.log("algo")
})

//----------sendFile para enviar archivos estaticos, no se usa mucho
app.get('/static-file', (request, response) => {
    response.sendFile(__dirname+'/index.html')  
})
//SERVIDOR A ESCUCHAR PUERTO 8080
app.listen(PORT, ()=> {
    console.log(`el servidor esta corriendo en el puerto ${PORT}`)
})


