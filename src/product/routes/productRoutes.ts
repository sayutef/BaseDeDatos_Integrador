import { Router } from "express";
import { getAllProduct, getProductrById,createProduct,updateProdct,deleteProduct,deleteLogicalProduct } from "../controllers/productController";
import { authMiddleware } from "../../shared/middlewares/auth";
const productRoutes: Router = Router();
 
productRoutes.put('/deleted/:user_id',authMiddleware,deleteLogicalProduct ); 
productRoutes.get('/', authMiddleware,getAllProduct); 
productRoutes.get('/:product_id', authMiddleware,getProductrById);
productRoutes.post('/', authMiddleware,createProduct);
productRoutes.put('/:product_id', authMiddleware,updateProdct); 
productRoutes.delete('/:product_id', authMiddleware,deleteProduct); 

export default productRoutes;