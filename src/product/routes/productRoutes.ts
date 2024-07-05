import { Router } from "express";
import { getAllProduct, getProductrById,createProduct,updateProdct,deleteProduct } from "../controllers/productController";
import { authMiddleware } from "../../shared/middlewares/auth";
const productRoutes: Router = Router();

productRoutes.get('/', authMiddleware,getAllProduct); 
productRoutes.get('/:product_id', authMiddleware,getProductrById);
productRoutes.post('/', authMiddleware,createProduct);
productRoutes.put('/:product_id', authMiddleware,updateProdct); 
productRoutes.delete('/:product_id', authMiddleware,deleteProduct); 

export default productRoutes;