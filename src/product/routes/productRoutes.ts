import { Router } from "express";
import { getAllProducts, getProductById,createProduct,updateProduct,deleteProduct,deleteLogicalProduct } from "../controllers/productController";
import { authMiddleware } from "../../shared/middlewares/auth";
const productRoutes: Router = Router();
 
productRoutes.put('/deleted/:user_id',authMiddleware,deleteLogicalProduct ); 
productRoutes.get('/', authMiddleware,getAllProducts); 
productRoutes.get('/:product_id', authMiddleware,getProductById);
productRoutes.post('/', authMiddleware,createProduct);
productRoutes.put('/:product_id', authMiddleware,updateProduct); 
productRoutes.delete('/:product_id', authMiddleware,deleteProduct); 

export default productRoutes;