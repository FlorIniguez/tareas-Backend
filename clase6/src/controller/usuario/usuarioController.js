const UsuarioModel = require("../../models/usuariosModels");

const addUserController = async (req, res) => {
  try {
    const { username, password, rol, isActive, createAt } = req.body;
    //en postaman paso por body los datos
    const newUser = new UsuarioModel({
      username,
      password,
      rol,
      isActive,
      createAt,
    });
    await newUser.save();
    res.json({ message: "usuario creado ok" });
  } catch (error) {
    // console.log(error)
    res
      .status(500)
      .json({ message: error.message + "No se ha podido crear el usuario" });
  }
};

const getUserController = async (req, res) => {
  try {
    const allUsers = await UsuarioModel.find();
    res.json(allUsers);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: error.message + "No se ha podido acceder a los usuarios",
      });
  }
};
const getUserByUsernameController = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await UsuarioModel.findOne({ username });
    if (!user)
      return res
        .status(404)
        .json({
          message: `Usuario con el username '${username}' no encontrado`,
        });
    res.json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: error.message + "No se ha podido acceder al usuario" });
  }
};
const updateUserController = async (req,res) => {
    try {
        const {username} = req.params;
        const user = req.body;
        let updateUser = await UsuarioModel.findOne({
            username
        });
        updateUser.username = user.username;
        updateUser.password = user.password;
        await updateUser.save();
        res.json({mesagge: "Usuario actualizado", updateUser})
    } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ message: error.message + "No se ha podido actualizar el usuario" });
      
    }
}
const deleteUserController = async (req, res) => {
    try {
      const { username } = req.params;
      await UsuarioModel.deleteOne({ username });
      res.json({ message: "Usuario eliminado" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "No se ha podido eliminar el usuario" + error.message });
    }
  };
  
module.exports = {
  addUserController,
  getUserController,
  getUserByUsernameController,
  updateUserController,
  deleteUserController
}
