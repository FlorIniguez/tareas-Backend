const AutosModel = require("../models/autosModels");

const addCarsController = async (req, res) => {
  try {
    const { modelo, año, marca, fechaFabricacion, precio } = req.body;
    //en postaman paso por body los datos
    const newUser = new AutosModel({
      modelo,
      año,
      marca,
      fechaFabricacion,
      precio,
    });
    await newUser.save();
    res.json({ message: "auto ingresado ok" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: error.message + "No se ha podido ingresar el auto" });
  }
};

const getCarsController = async (req, res) => {
  try {
    const allAutos = await AutosModel.find();
    res.json(allAutos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message + "No se ha podido acceder al listado",
    });
  }
};
const getCarBymodeloController = async (req, res) => {
  try {
    const { modelo } = req.params;
    const auto = await AutosModel.findOne({ modelo });
    if (!auto)
      return res.status(404).json({
        message: `Auto modelo '${modelo}' no encontrado`,
      });
    res.json(auto);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: error.message + "No se ha podido acceder al auto" });
  }
};
const updateCarsController = async (req, res) => {
  try {
    const { modelo } = req.params;
    const car = req.body;
    let updateCar = await AutosModel.findOne({
      modelo,
    });
    updateCar.modelo = car.modelo;
    updateCar.año = car.año;
    await updateCar.save();
    res.json({ mesagge: "Auto actualizado", updateCar });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: error.message + "No se ha podido actualizar el auto" });
  }
};
const deleteCarController = async (req, res) => {
  try {
    const { modelo } = req.params;
    await AutosModel.deleteOne({ modelo });
    res.json({ message: "Auto eliminado" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "No se ha podido eliminar el usuario" + error.message });
  }
};

module.exports = {
  addCarsController,
  deleteCarController,
  updateCarsController,
  getCarBymodeloController,
  getCarsController,
};
