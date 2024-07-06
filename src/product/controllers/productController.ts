import { Request, Response } from "express";
import { productService } from "../services/productService";


export const getAllProduct = async (_req: Request, res: Response) => {
    try {
        const products = await productService.getAllProduct();
        res.status(200).json(products);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getProductrById = async (req: Request, res: Response) => {
    try {
        const productId = parseInt(req.params.product_id, 10);
        const product = await productService.getProductById(productId);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Producto no encontrado.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const newProduct = await productService.addProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProdct = async (req: Request, res: Response) => {
    try {
        const productId = parseInt(req.params.product_id, 10);
        const updatedUser = await productService.modifyProduct(productId, req.body);
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'Producto no encontrado o no se pudo actualizar.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const productId = parseInt(req.params.product_id, 10);
        const deleted = await productService.deletedroduct(productId);
        if (deleted) {
            res.status(200).json({ message: 'Producto eliminado correctamente.' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado o no se pudo eliminar.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
export const deleteLogicalProduct = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.user_id, 10);
        const success = await productService.deleteProductLogic(userId);
        if (success) {
            res.status(200).json({ message: 'User logically deleted successfully.' });
        } else {
            res.status(404).json({ message: 'User not found or already logically deleted.' });
        }
    } catch (error : any) {
        res.status(500).json({ error: error.message });
    }
};