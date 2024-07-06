import { ProductRepository } from "../repositories/ProductRepository";
import { Product } from "../models/Product";
import { DateUtils } from "../../shared/utils/DateUtils";

export class productService{
    public static async getAllProduct(): Promise<Product[]> {
        try {
            return await ProductRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener producto: ${error.message}`);
        }
    }

    public static async getProductById(productId: number): Promise<Product | null> {
        try {
            return await ProductRepository.findById(productId);
        } catch (error: any) {
            throw new Error(`Error al encontrar producto: ${error.message}`);
        }
    }

    public static async addProduct(product : Product) {
        try {
            product.created_at = DateUtils.formatDate(new Date()) // Asignar fecha actual formateada
            product.updated_at = DateUtils.formatDate(new Date()); 
            return await ProductRepository.createUser(product);
        } catch (error: any) {
            throw new Error(`Error al crear producto: ${error.message}`);
        }
    }

    public static async modifyProduct(productId: number, productData:  Product) {
        try {
            const productFinded = await ProductRepository.findById(productId);
            if (productFinded) {
                if (productData.name) {
                    productFinded.name = productData.name;
                }
                if (productData.description) {
                    productFinded.description = productData.description;
                }
                if (productData.price) {
                    productFinded.price = productData.price;
                }
                if(productData.updated_by){
                    productFinded.updated_by = productData.updated_by
                }
                if(productData.updated_at){
                    productFinded.updated_at = DateUtils.formatDate(new Date());
                }
                if(productData.category){
                    productFinded.category = productData.category
                }
                if(productData.stock){
                    productFinded.stock = productData.stock
                }
                if(productData.type_measurement){
                    productFinded.type_measurement = productData.type_measurement
                }
                if (productData.deleted !== undefined) {
                    productFinded.deleted = productData.deleted;
                }
            } else {
                return null;
            }
            productData.updated_at = DateUtils.formatDate(new Date());
            return await ProductRepository.updateProduct(productId, productFinded);
        } catch (error: any) {
            throw new Error(`Error al modificar producto: ${error.message}`);
        }
    }

    public static async deletedroduct(productId: number): Promise<boolean> {
        try {
            return await ProductRepository.deleteUser(productId);
        } catch (error: any) {
            throw new Error(`Error al eliminar producto: ${error.message}`);
        }
    }
    public static async deleteProductLogic(userId: number): Promise<boolean> {
        try {
            return await ProductRepository.deleteProductLogic(userId);
        } catch (error: any) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }
}