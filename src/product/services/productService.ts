import { ProductRepository } from "../repositories/ProductRepository";
import { Product } from "../models/Product";
import { DateUtils } from "../../shared/utils/DateUtils";

export class ProductService {

    public static async getAllProducts(): Promise<Product[]> {
        try {
            return await ProductRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error retrieving products: ${error.message}`);
        }
    }

    public static async getProductById(product_id: number): Promise<Product | null> {
        try {
            return await ProductRepository.findById(product_id);
        } catch (error: any) {
            throw new Error(`Error finding product: ${error.message}`);
        }
    }

    public static async addProduct(product: Product): Promise<Product> {
        try {
            product.created_at = DateUtils.formatDate(new Date());
            product.updated_at = DateUtils.formatDate(new Date());
            return await ProductRepository.createUser(product);
        } catch (error: any) {
            throw new Error(`Error creating product: ${error.message}`);
        }
    }

    public static async updateProduct(product_id: number, productData: Partial<Product>): Promise<Product | null> {
        try {
            const productFound = await ProductRepository.findById(product_id);

            if (!productFound) {
                throw new Error(`Product with ID ${product_id} not found.`);
            }

            if (productData.name !== undefined) {
                productFound.name = productData.name;
            }
            if (productData.description !== undefined) {
                productFound.description = productData.description;
            }
            if (productData.price !== undefined) {
                productFound.price = productData.price;
            }
            if (productData.stock !== undefined) {
                productFound.stock = productData.stock;
            }
            if (productData.category_id_fk !== undefined) {
                productFound.category_id_fk = productData.category_id_fk;
            }
            if (productData.updated_by !== undefined) {
                productFound.updated_by = productData.updated_by;
            }
            if (productData.updated_at !== undefined) {
                productFound.updated_at = DateUtils.formatDate(new Date());
            }
            if (productData.deleted !== undefined) {
                productFound.deleted = productData.deleted;
            }

            return await ProductRepository.updateProduct(product_id, productFound);
        } catch (error: any) {
            throw new Error(`Error modifying product: ${error.message}`);
        }
    }

    public static async deleteProduct(product_id: number): Promise<boolean> {
        try {
            return await ProductRepository.deleteUser(product_id);
        } catch (error: any) {
            throw new Error(`Error deleting product: ${error.message}`);
        }
    }

    public static async deleteLogicalProduct(product_id: number): Promise<boolean> {
        try {
            return await ProductRepository.deleteProductLogic(product_id);
        } catch (error: any) {
            throw new Error(`Error logically deleting product: ${error.message}`);
        }
    }
}
