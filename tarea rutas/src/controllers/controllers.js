const saludoUsuario = (req,res) => {
    const {nombre, apellido} = req.params
    res.send(`Hola ${nombre} ${apellido}`)
}
const dividir = (req,res) => {
  let x= Number(req.params.x);
    let y= Number(req.params.y);
    if (y === 0) {
        res.json({ error: "No se puede dividir por cero" });
    } else {
    const resultado = x / y;   
    res.send(`resultado:${resultado}`)
    }
 }
const sumar = (req,res) => { 
  let a= Number(req.params.a);
  let b= Number(req.params.b);
  if (a < 0 || b < 0) {
      res.json({ error: "No se aceptan nùmeros menores a 0" });
  } else {
      const resultado = a+b;
      res.send(`resultado:${resultado}`)
  }
}
const esPar = (req,res) => {
  let numero= Number(req.query.numero);
  if (numero % 2 === 0) {
      res.send("No autorizado")
  } else {
      res.send("Autorizado")
  }
 }

  const listaDeCompras = (req,res)=>{ 
    const cantidad = req.query.cantidad || 5;
    const listaDeCompras = {
        productos: [
            { nombre: "Producto 1", precio: 10 },
            { nombre: "Producto 2", precio: 20 },
            { nombre: "Producto 3", precio: 30 },
            { nombre: "Producto 4", precio: 40 },
            { nombre: "Producto 5", precio: 50 }
        ]
    };
   if (cantidad == 5) {
        res.json({listaDeCompras});
    } else {
        res.send(`Error`);
    }
}
const postNombres = (req,res)=>{
    const nombre = req.body.nombre;

    if (!nombre) {
      res.status(400).json({ error: "El nombre no fue proporcionado en el cuerpo de la solicitud" });
    } else {
      res.json({ nombre: nombre, status: "success" });
    }
  };
  

module.exports = {saludoUsuario, sumar,dividir,esPar, listaDeCompras, postNombres}