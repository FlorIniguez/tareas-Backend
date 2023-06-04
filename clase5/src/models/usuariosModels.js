const {mongoose, Schema } = require("mongoose");

const UsuarioSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password obligatorio']
    },
    rol:{
        type: String,
       default: 'USER_ROLE',
       enum: ['ADMIN_ROLE', 'USER_ROLE']
       //OPCIONES 
    },
    isActive: {
        type: Boolean,
        default: true
    },
createAt: {
    type: Date,
    default: Date.now
}

})
const UsuarioModel = mongoose.model('Usuario', UsuarioSchema)

module.exports = UsuarioModel