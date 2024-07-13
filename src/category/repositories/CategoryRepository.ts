import { ResultSetHeader } from "mysql2";
import connection from "../../shared/config/database";
import { Category } from "../models/Category";

export class CategoryRepository {
    public static async findAll(): Promise<Category[]> {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM category', (error: any, result) => {
                if (error) {
                    reject(error);
                } else {
                    const categories: Category[] = result as Category[];
                    resolve(categories);
                }
            });
        });
    }

    public static async findById(category_id: number): Promise<Category | null> {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM category WHERE category_id = ?', [category_id], (error: any, result) => {
                if (error) {
                    reject(error);
                } else {
                    const categories: Category[] = result as Category[];
                    if (categories.length > 0) {
                        resolve(categories[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createCategory(category: Category): Promise<Category> {
        const query = 'INSERT INTO category (name, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            category.updated_by = category.created_by;
            connection.execute(
                query,
                [
                    category.name,
                    category.created_at,
                    category.created_by,
                    category.updated_at,
                    category.updated_by,
                    category.deleted ? 1 : 0 // Convert boolean to 1 or 0
                ],
                (error, result: ResultSetHeader) => {
                    if (error) {
                        reject(error);
                    } else {
                        const createdCategoryId = result.insertId;
                        const createdCategory: Category = { ...category, category_id: createdCategoryId };
                        resolve(createdCategory);
                    }
                }
            );
        });
    }

    public static async updateCategory(categoryId: number, categoryData: Partial<Category>): Promise<Category | null> {
        const { name, updated_at, updated_by, deleted } = categoryData;
        const query = 'UPDATE category SET name = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE category_id = ?';
        const params = [
            name,
            updated_at,
            updated_by,
            deleted ? 1 : 0, // Convert boolean to 1 or 0
            categoryId
        ];

        return new Promise((resolve, reject) => {
            connection.execute(
                query,
                params,
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        if ((result as ResultSetHeader).affectedRows > 0) {
                            const updatedCategory: Category = { ...categoryData as Category, category_id: categoryId };
                            resolve(updatedCategory);
                        } else {
                            resolve(null);
                        }
                    }
                }
            );
        });
    }

    public static async deleteCategory(category_id: number): Promise<boolean> {
        const query = 'DELETE FROM category WHERE category_id = ?';
        return new Promise((resolve, reject) => {
            connection.execute(query, [category_id], (error, result: ResultSetHeader) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.affectedRows > 0);
                }
            });
        });
    }

    public static async deleteCategoryLogic(category_id: number): Promise<boolean> {
        const query = 'UPDATE category SET deleted = 1 WHERE category_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [category_id], (error, result: ResultSetHeader) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.affectedRows > 0);
                }
            });
        });
    }
}
