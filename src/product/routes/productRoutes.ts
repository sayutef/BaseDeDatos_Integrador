import express from "express";
import { ProductController } from "../controllers/productController";

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
