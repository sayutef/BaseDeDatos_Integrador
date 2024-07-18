
import express from "express";
import { ProductController } from "../controllers/productController";
import { authMiddleware } from "../../shared/middlewares/auth";
const productsRoutes = express.Router();

productsRoutes.get("/", authMiddleware, ProductController.getAllProducts);
productsRoutes.get("/manuales", authMiddleware, ProductController.getProductManuales);
productsRoutes.get("/electricos", authMiddleware, ProductController.getProductElectricos);
productsRoutes.get("/construccion", authMiddleware, ProductController.getProductConstruccion);
productsRoutes.get("/othermore", authMiddleware, ProductController.getProductOtherMore);
productsRoutes.get("/:product_id",authMiddleware,  ProductController.getProductById);
productsRoutes.post("/",authMiddleware,  ProductController.addProduct);
productsRoutes.put("/:product_id",authMiddleware,  ProductController.updateProduct);
productsRoutes.delete("/:product_id",authMiddleware,  ProductController.deleteProduct);
productsRoutes.patch("/:product_id", authMiddleware, ProductController.deleteProductLogic);

export default productsRoutes;
