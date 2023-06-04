const server = require ('./server/server.js');
const PORT = 8080;



server.listen(PORT, () => {
  console.log(`servidor corriendo en puerto ${PORT}`);
});
