import { Request, Response } from "express";
import Product from "../../models/Product";

export const getAllProductsController =  async (req:Request,res: Response) => {
     const products =  await Product.find();
     res.json(products);
   
}