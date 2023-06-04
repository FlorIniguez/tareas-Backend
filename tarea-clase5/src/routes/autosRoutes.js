const express = require('express');
const { addCarsController, getCarsController, getCarBymodeloController, updateCarsController, deleteCarController } = require('../controller/carsController');
const router = express.Router();


router.get('/cars', getCarsController);
router.get('/cars/:modelo', getCarBymodeloController)
router.post('/cars', addCarsController);
router.put('/cars/:modelo', updateCarsController);
router.delete('/cars/:modelo', deleteCarController)
module.exports = router;