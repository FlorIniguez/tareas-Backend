const express =require('express');
const router = express.Router();
const {getEjemplo, readItems, readForId, addItem, updateItem, deleteItem} = require('../controller/controller')

//aca van los metodos
router.get('/ejemplo',getEjemplo)

router.get('/db', readItems)

router.get('/db/:idObjeto', readForId)

router.post('/db', addItem)

router.put('/db/:idObjeto',updateItem)

router.delete('/db/:idObjeto',deleteItem)

module.exports = router;