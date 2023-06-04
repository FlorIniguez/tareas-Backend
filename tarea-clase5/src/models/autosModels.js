const { mongoose, Schema } = require("mongoose");

const AutosSchema = new Schema({
  modelo: {
    type: String,
    required: [true, "modelo obligatorio"],
  },
  año: {
    type: Number,
    required: [true, "Año obligatorio"],
  },
  marca: {
    type: String,
    required: [true, "marca obligatorio"],
  },
  fechaFabricacion: {
    type: Date,
    default: Date.now,
  },
  precio: {
    type: Number,
        required: [true, "Precio obligatorio"],
  }
});
const AutosModel = mongoose.model("Usuario", AutosSchema);

module.exports = AutosModel;
