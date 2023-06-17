const bcrypt = require('bcrypt');
const UsuarioModel = require("../../models/usuariosModels");
const { generateJWT } = require('../../utils/middlewares/generateJWT');
require('dotenv').config();

const loginController = async (req, res) => {
    const { username, password} = req.body;

    const user = await UsuarioModel.findOne({ username });
    if(!user){
       return res.status(400).json({message: 'Usuario y/o contraseña inválidos.'});
    } 
    const isValidPassword = bcrypt.compareSync(password, user.password)
    if(!isValidPassword) {
        return res.status(400).json({message: 'Password y/o contraseña inválidos'})
    }
    const token = generateJWT(username, user.rol)
    res.json({token:token, message: 'Login exitoso'})
}

const registerController = async (req, res) => {
    try {
        const { username, password,repeatPassword, rol, isActive, createAt } = req.body;
        if (password !==repeatPassword) {
            return res.status(400).json({message: 'contraseñas no coinciden'})
        } 
       const hashPassword = bcrypt.hashSync(password, 10)
       const newUser = new UsuarioModel({
        username,
        password : hashPassword,
        rol,
        isActive,
        createAt,
      });
      await newUser.save();
      res.json({ message: "usuario creado ok" });
    } catch (error) {
        res
        .status(500)
        .json({ message: error.message + "No se ha podido crear el usuario" });
    }
}
module.exports = { loginController, registerController };