import { ResultSetHeader} from "mysql2";
import connection from "../../shared/config/database";
import { Product } from "../models/Product";

export class ProductRepository{
    
    public static async findAll(): Promise <Product[]>{
        const query = "SELECT *FROM product";
        return new Promise((resolve,reject)=>{
            connection.query(query,(error,results)=>{
                if(error){
                    reject(error);
                }else{
                    const product : Product[] = results as Product[];
                    resolve(product);
                }
            });
        });
    }

    
    public static async findById(product_id: number): Promise<Product | null> {
        const query = "SELECT * FROM product WHERE product_id = ?";
        return new Promise((resolve, reject) => {
            connection.query(query, [product_id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const product: Product[] = results as Product[];
                    if (product.length > 0) {
                        resolve(product[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }
    
    public static async createUser(product : Product): Promise<Product> {
        const query = 'INSERT INTO product (name, description, price, category,stock, type_measurement,created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?,?)';
        return new Promise((resolve, reject) => {
            connection.query(query, [product.name, product.description , product.price,product.category,product.stock,product.type_measurement, product.created_by, product.updated_at, product.updated_by, product.deleted], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const createProductId = (result as ResultSetHeader).insertId;
                    const createProduct: Product = { ...product, product_id: createProductId };
                    resolve(createProduct);
                }
            });
        });
    }
    public static async updateProduct(product_id: number, productData: Product): Promise<Product | null> {
        const query = `
            UPDATE product
            SET name = ?, description = ?, price = ?, category = ?, stock = ?, type_measurement = ?, updated_at = ?, updated_by = ?, deleted = ?
            WHERE product_id = ?
        `;
        const values = [
            productData.name,
            productData.description,
            productData.price,
            productData.category,
            productData.stock, // Corrige el campo de stock
            productData.type_measurement, // Corrige el campo de type_measurement
            productData.updated_at,
            productData.updated_by,
            productData.deleted ? 1 : 0,
            product_id
        ];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(`Error al modificar el producto: ${error.message}`);
                } else {
                    if ((result as any).affectedRows > 0) {
                        const updatedProduct: Product = { ...productData, product_id: product_id };
                        resolve(updatedProduct);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async deleteUser(product_id: number): Promise<boolean> {
        const query = 'DELETE FROM product WHERE product_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [product_id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as ResultSetHeader).affectedRows > 0) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            });
        });
    }

}