const fsPromises = require("fs/promises"); 
const { dirname } = require("path");

const getEjemplo = (req,res) =>{
    res.send('probando servidor')
}
//Leer items
const readItems = async (req, res) => {
    const objectsTextoPlano = await fsPromises.readFile("./src/db/database.txt");
    const objectsJSON = JSON.parse(objectsTextoPlano);
    res.json(objectsJSON); //para que me retorne un json
  };

  //leer item por ID
  const readForId = async (req, res) => {
    const { idObjeto } = req.params;
    const objectsTextoPlano = await fsPromises.readFile("./src/db/database.txt");
    const objectsJSON = JSON.parse(objectsTextoPlano);
    const encontrarObjeto = objectsJSON.find(
      (objectsJSON) => objectsJSON.id === Number(idObjeto)
    );
    encontrarObjeto
      ? res.json(encontrarObjeto)
      : res.status(404).json({ mesagge: "objeto no encontrado" });
  };
  //Agregar nuevo item 
  const addItem = async (req, res) => {
    const objectBody = req.body;
    const objectsTextoPlano = await fsPromises.readFile("./src/db/database.txt");
    const objectsJSON = JSON.parse(objectsTextoPlano);
    const lastObject = objectsJSON[objectsJSON.length - 1]; // Obtener el último objeto de la lista
    const higherId = lastObject.id + 1; // A ese id le agrego 1
    objectBody.id = higherId; // objectBody es el objeto que quiero agregar
    objectsJSON.push(objectBody);
    const objectJsonToString = JSON.stringify(objectsJSON);
    await fsPromises.writeFile("./src/db/database.txt", objectJsonToString);
  
    res.json({ message: "Se agregó el objeto a la lista." });
  }
  //Actualizar un item
  const updateItem =  async (req, response) => {
    const { idObjeto } = req.params;
    const datosActualizados = req.body;
    try {
      const jsonData = await fsPromises.readFile("./src/db/database.txt", 'utf8');
      const objetos = JSON.parse(jsonData);
      const objetoIndex = objetos.findIndex((objeto) => objeto.id === Number(idObjeto));
  
      if (objetoIndex !== -1) {
        objetos[objetoIndex] = { ...objetos[objetoIndex], ...datosActualizados };
  
        await fsPromises.writeFile("./src/db/database.txt", JSON.stringify(objetos));
        response.send('Datos del objeto actualizados correctamente');
      } else {
        response.status(404).send('Objeto no encontrado');
      }
    } catch (err) {
      console.error(err);
      response.status(500).send('Error interno del servidor');
    }
  }
  //Eliminar un item
  const deleteItem =  async (req, res) => {
    const { idObjeto } = req.params;
    try {
      const data = await fsPromises.readFile("./src/db/database.txt",'utf8');
      const objetos = JSON.parse(data);
      const objetoIndex = objetos.findIndex((objeto) => objeto.id === Number(idObjeto));
  
      if (objetoIndex !== -1) {
        objetos.splice(objetoIndex, 1);
  
        await fsPromises.writeFile("./src/db/database.txt", JSON.stringify(objetos));
        res.send('Objeto eliminado correctamente');
      } else {
        res.status(404).send('Objeto no encontrado');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error interno del servidor');
    }
  }
  
module.exports = {getEjemplo, readItems, readForId, addItem, updateItem, deleteItem}