<<<<<<< HEAD
import { Router } from "express";
import { getAllProducts, getProductById,createProduct,updateProduct,deleteProduct,deleteLogicalProduct } from "../controllers/productController";
import { authMiddleware } from "../../shared/middlewares/auth";

const productRoutes: Router = Router();
 
productRoutes.put('/deleted/:user_id',deleteLogicalProduct ); 
productRoutes.get('/',authMiddleware,getAllProducts); 
productRoutes.get('/:product_id', getProductById);
productRoutes.post('/', authMiddleware,createProduct);
productRoutes.put('/:product_id', updateProduct); 
productRoutes.delete('/:product_id', deleteProduct); 
=======
import express from "express";
import { ProductController } from "../controllers/productController";
>>>>>>> 572084eeeb67d2e0d666fdbb3a4f2eeeae76bbc2

const productsRoutes = express.Router();

productsRoutes.get("/", ProductController.getAllProducts);
productsRoutes.get("/manuales", ProductController.getProductManuales);
productsRoutes.get("/electricos", ProductController.getProductElectricos);
productsRoutes.get("/construccion", ProductController.getProductConstruccion);
productsRoutes.get("/othermore", ProductController.getProductOtherMore);
productsRoutes.get("/:product_id", ProductController.getProductById);
productsRoutes.post("/", ProductController.addProduct);
productsRoutes.put("/:product_id", ProductController.updateProduct);
productsRoutes.delete("/:product_id", ProductController.deleteProduct);
productsRoutes.patch("/:product_id", ProductController.deleteProductLogic);

export default productsRoutes;
