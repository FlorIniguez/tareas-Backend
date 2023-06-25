import { Request, Response } from "express";
import Product, { IProduct } from "../../models/Product";
import { AddProductDTO, APIDolar } from "./interfaces";
import axios from "axios";

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isDolar } = req.query;
    const product: AddProductDTO = req.body;
    const productDB: IProduct | null = await Product.findById(id);

    if (!productDB) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    productDB.name = product.name;
    //si es dolar es true lo deja como esta
    if (isDolar === "true") {
      productDB.price = product.price;
    } else {
      const { data } = await axios.get<APIDolar>(
        "https://criptoya.com/api/dolar"
      );
      //si es dolar es falso lo pasa a dlar
      productDB.price = data.blue * product.price;
    }
    productDB.category = product.category;

    await productDB.save();
    res.json({ message: "El producto fue actualizado con exito." });
  } catch (error) {
    res.status(500).json({ message: "Ocurrio un error" });
  }
};