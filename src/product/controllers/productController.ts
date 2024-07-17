import { Request, Response } from "express";
import { ProductService } from "../services/productService";
import { Product } from "../models/Product";

export class ProductController {
    
    public static async getAllProducts(_req: Request, res: Response): Promise<void> {
        try {
            const products: Product[] = await ProductService.getAllProducts();
            res.status(200).json(products);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public static async getProductManuales(_req: Request, res: Response): Promise<void> {
        try {
            const products: Product[] = await ProductService.getProductManuales();
            res.status(200).json(products);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public static async getProductElectricos(_req: Request, res: Response): Promise<void> {
        try {
            const products: Product[] = await ProductService.getProductElectricos();
            res.status(200).json(products);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public static async getProductConstruccion(_req: Request, res: Response): Promise<void> {
        try {
            const products: Product[] = await ProductService.getProductConstruccion();
            res.status(200).json(products);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public static async getProductOtherMore(_req: Request, res: Response): Promise<void> {
        try {
            const products: Product[] = await ProductService.getProductOtherMore();
            res.status(200).json(products);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public static async getProductById(req: Request, res: Response): Promise<void> {
        const product_id: number = parseInt(req.params.product_id);

        try {
            const product: Product | null = await ProductService.getProductById(product_id);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public static async addProduct(req: Request, res: Response): Promise<void> {
        const productData: Product = req.body;

        try {
            const newProduct: Product = await ProductService.addProduct(productData);
            res.status(201).json(newProduct);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public static async updateProduct(req: Request, res: Response): Promise<void> {
        const product_id: number = parseInt(req.params.product_id);
        const productData: Product = req.body;

        try {
            const updatedProduct: Product | null = await ProductService.updateProduct(product_id, productData);
            if (updatedProduct) {
                res.status(200).json(updatedProduct);
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public static async deleteProduct(req: Request, res: Response): Promise<void> {
        const product_id: number = parseInt(req.params.product_id);

        try {
            const success: boolean = await ProductService.deleteProduct(product_id);
            if (success) {
                res.status(200).json({ message: "Product deleted successfully" });
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public static async deleteProductLogic(req: Request, res: Response): Promise<void> {
        const product_id: number = parseInt(req.params.product_id);

        try {
            const success: boolean = await ProductService.deleteProductLogic(product_id);
            if (success) {
                res.status(200).json({ message: "Product deleted successfully" });
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
