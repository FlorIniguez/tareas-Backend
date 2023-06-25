import express  from "express";
import { addProductController } from "../controllers/products/addProductController";
import { getAllProductsController } from "../controllers/products/getAllProductsController";
import { deleteProductController } from "../controllers/products/deleteProductController";
import { updateProductController } from "../controllers/products/updateProduct";

const router = express.Router();

router.get('/', getAllProductsController)
router.post('/', addProductController);
router.delete('/:id',deleteProductController);
router.put('/:id', updateProductController)
export default router;