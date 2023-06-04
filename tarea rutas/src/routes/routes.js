const express =require('express');
const { saludoUsuario, listaDeCompras, postNombres, sumar, dividir, esPar } = require('../controllers/controllers');
const router = express.Router();

router.get('/users/:nombre/:apellido', saludoUsuario);
router.get('/maths/suma/:a/:b', sumar);
router.get('/maths/division/:x/:y', dividir);
router.get('/maths/par/:numero', esPar);
router.get('/list', listaDeCompras);
router.post('/nombre', postNombres)
module.exports = router;