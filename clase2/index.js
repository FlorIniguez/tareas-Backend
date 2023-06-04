//express: El módulo Express se utiliza para crear y configurar el servidor.
//app: Es la instancia de la aplicación Express.
//fsPromises: Es el módulo fs/promises que proporciona funciones asincrónicas para trabajar con el sistema de archivos.
const express = require("express");
const app = express();
const fsPromises = require("fs/promises"); 

//Codigo normatico hay q ponerlo para que el servidor funcione
//lo que llega por body lo entiende como json
// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json())

//LEER TODOS LOS ITEMS
//Cuando se recibe una solicitud GET en la ruta "/objeto", se lee el archivo de la 
//base de datos que contiene los objetos en formato JSON. Luego se envía la respuesta con los objetos en formato JSON.
app.get("/objeto", async (request, response) => {
  const objectsTextoPlano = await fsPromises.readFile("./db/database.txt");
  const objectsJSON = JSON.parse(objectsTextoPlano);
  response.json(objectsJSON); //para que me retorne un json
});

//LEER UN ITEM POR ID
//Cuando se recibe una solicitud GET en la ruta "/objeto", se lee el archivo de la base de datos que contiene
// los objetos en formato JSON. Luego se envía la respuesta con los objetos en formato JSON.
app.get("/objeto/:idObjeto", async (request, response) => {
  const { idObjeto } = request.params;
  const objectsTextoPlano = await fsPromises.readFile("./db/database.txt");
  const objectsJSON = JSON.parse(objectsTextoPlano);
  const encontrarObjeto = objectsJSON.find(
    (objectsJSON) => objectsJSON.id === Number(idObjeto)
  );
  encontrarObjeto
    ? response.json(encontrarObjeto)
    : response.status(404).json({ mesagge: "objeto no encontrado" });
});
//AGREGAR UN NUEVO ITEM
//puedo repetir la ruta si cambia el metodo get post, put
//Cuando se recibe una solicitud POST en la ruta "/objeto", se lee el cuerpo de la solicitud (req.body),
// se agrega el objeto al array de objetos, se asigna un ID único al objeto y se guarda en el archivo de la base de datos.
// Luego se envía una respuesta con un mensaje indicando que el objeto se agregó correctamente.
app.post("/objeto", async (req, res) => {
  const objectBody = req.body;
  const objectsTextoPlano = await fsPromises.readFile("./db/database.txt");
  const objectsJSON = JSON.parse(objectsTextoPlano);
  const lastObject = objectsJSON.at(-1); //obtengo el último objeto de la lista
  const higherId = lastObject.id + 1; //a ese id le agrego 1
  objectBody.id = higherId; //objectBody es el objeto que quiero agregar
  objectsJSON.push(objectBody);
  const objectJsonToString = JSON.stringify(objectsJSON);
  await fsPromises.writeFile('./db/database.txt', objectJsonToString);

  res.json({ message: "Se agregó el objeto a la lista." });
});
//actualizar
//Esta ruta se utiliza para actualizar un objeto existente
app.put('/objeto/:idObjeto', async (req, response) => {
  const { idObjeto } = req.params;
  const datosActualizados = req.body;
  try {
    const jsonData = await fsPromises.readFile('./db/database.txt', 'utf8');
    const objetos = JSON.parse(jsonData);
    const objetoIndex = objetos.findIndex((objeto) => objeto.id === Number(idObjeto));

    if (objetoIndex !== -1) {
      objetos[objetoIndex] = { ...objetos[objetoIndex], ...datosActualizados };

      await fsPromises.writeFile('./db/database.txt', JSON.stringify(objetos));
      response.send('Datos del objeto actualizados correctamente');
    } else {
      response.status(404).send('Objeto no encontrado');
    }
  } catch (err) {
    console.error(err);
    response.status(500).send('Error interno del servidor');
  }
});
// Eliminar
//req.params para obtener el valor del parámetro idObjeto de la URL. Luego, 
//leemos el archivo JSON, buscamos el objeto con el ID correspondiente, lo eliminamos del array de objetos y 
//finalmente escribimos los cambios en el archivo JSON.
app.delete('/objeto/:idObjeto', async (req, res) => {
  const { idObjeto } = req.params;
  try {
    const data = await fsPromises.readFile('./db/database.txt','utf8');
    const objetos = JSON.parse(data);
    const objetoIndex = objetos.findIndex((objeto) => objeto.id === Number(idObjeto));

    if (objetoIndex !== -1) {
      objetos.splice(objetoIndex, 1);

      await fsPromises.writeFile('./db/database.txt', JSON.stringify(objetos));
      res.send('Objeto eliminado correctamente');
    } else {
      res.status(404).send('Objeto no encontrado');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error interno del servidor');
  }
});

app.listen(8080, () => {
  console.log("Servidor up en puerto");
});
