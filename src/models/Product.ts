import mongoose,{Document, Schema} from "mongoose";

export enum Categories {
    ALMACEN = "ALMACEN",
    ELECTRIC = "ELECTRONICA",
    INFORMATIC = "INFORMATICA",
    HOME = "HOGAR"
}
export interface IProduct extends Document {
    name: String;
    price: Number;
    category: Categories;
    //category tiene que ser de alguna de las Catefories
}
const ProductSchema = new Schema({
    name: String,
    price: Number,
    //con Pbject.values cuando tengo clave/valor, me toma los valores
    category: {
        type:String, enum: Categories}
})
export default mongoose.model<IProduct>('Product', ProductSchema);