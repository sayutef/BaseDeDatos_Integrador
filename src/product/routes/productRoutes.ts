import { Router } from "express";
import { getAllProduct, getProductrById,createProduct,updateProdct,deleteProduct } from "../controllers/productController";

const productRoutes: Router = Router();

productRoutes.get('/', getAllProduct); 
productRoutes.get('/:product_id', getProductrById);
productRoutes.post('/', createProduct);
productRoutes.put('/:product_id', updateProdct); 
productRoutes.delete('/:product_id', deleteProduct); 

export default productRoutes;