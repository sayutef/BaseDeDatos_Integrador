import { Request, Response } from "express";
import { ProductService } from "../services/productService";
import { Product } from "../models/Product";

export const getAllProducts = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const products = await ProductService.getAllProducts();
        return res.status(200).json(products);
    } catch (error: any) {
        return res.status(500).json({ message: `Error retrieving products: ${error.message}` });
    }
};


export const getProductById = async (req: Request, res: Response): Promise<Response> => {
    const { product_id } = req.params;
    try {
        const product = await ProductService.getProductById(Number(product_id));
        if (product) {
            return res.status(200).json(product);
        } else {
            return res.status(404).json({ message: `Product not found` });
        }
    } catch (error: any) {
        return res.status(500).json({ message: `Error finding product: ${error.message}` });
    }
};

export const createProduct = async (req: Request, res: Response): Promise<Response> => {
    const productData: Product = req.body;
    try {
        const newProduct = await ProductService.addProduct(productData);
        return res.status(201).json(newProduct);
    } catch (error: any) {
        return res.status(500).json({ message: `Error creating product: ${error.message}` });
    }
};

export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
    const { product_id } = req.params;
    const productData: Partial<Product> = req.body;
    try {
        const updatedProduct = await ProductService.updateProduct(Number(product_id), productData);
        if (updatedProduct) {
            return res.status(200).json(updatedProduct);
        } else {
            return res.status(404).json({ message: `Product not found` });
        }
    } catch (error: any) {
        return res.status(500).json({ message: `Error modifying product: ${error.message}` });
    }
};

export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
    const { product_id } = req.params;
    try {
        const result = await ProductService.deleteProduct(Number(product_id));
        if (result) {
            return res.status(204).json({ message: `Product deleted successfully` });
        } else {
            return res.status(404).json({ message: `Product not found` });
        }
    } catch (error: any) {
        return res.status(500).json({ message: `Error deleting product: ${error.message}` });
    }
};

export const deleteLogicalProduct = async (req: Request, res: Response): Promise<Response> => {
    const { product_id } = req.params;
    try {
        const result = await ProductService.deleteLogicalProduct(Number(product_id));
        if (result) {
            return res.status(204).json({ message: `Product logically deleted successfully` });
        } else {
            return res.status(404).json({ message: `Product not found` });
        }
    } catch (error: any) {
        return res.status(500).json({ message: `Error logically deleting product: ${error.message}` });
    }
};
