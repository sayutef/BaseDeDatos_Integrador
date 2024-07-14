import { CategoryRepository } from "../repositories/CategoryRepository";
import { Category } from "../models/Category";
import { DateUtils } from "../../shared/utils/DateUtils";

export class CategoryService {
    public static async getAllCategories(): Promise<Category[]> {
        try {
            return await CategoryRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error retrieving categories: ${error.message}`);
        }
    }

    public static async getCategoryById(categoryId: number): Promise<Category | null> {
        try {
            return await CategoryRepository.findById(categoryId);
        } catch (error: any) {
            throw new Error(`Error finding category: ${error.message}`);
        }
    }

    public static async addCategory(category: Category): Promise<Category> {
        try {
            category.created_at = DateUtils.formatDate(new Date());
            category.updated_at = DateUtils.formatDate(new Date());
            return await CategoryRepository.createCategory({
                ...category,
                deleted: category.deleted || false // Set deleted to false if undefined
            });
        } catch (error: any) {
            throw new Error(`Error creating category: ${error.message}`);
        }
    }

    public static async updateCategory(categoryId: number, categoryData: Partial<Category>): Promise<Category | null> {
        try {
            const categoryFound = await CategoryRepository.findById(categoryId);

            if (!categoryFound) {
                throw new Error(`Category with ID ${categoryId} not found`);
            }

            if (categoryData.name) {
                categoryFound.name = categoryData.name;
            }
            if (categoryData.updated_by) {
                categoryFound.updated_by = categoryData.updated_by;
            }
            if (categoryData.updated_at) {
                categoryFound.updated_at = DateUtils.formatDate(new Date());
            }
            if (categoryData.deleted !== undefined) {
                categoryFound.deleted = categoryData.deleted;
            }

            const updatedCategory = await CategoryRepository.updateCategory(categoryId, {
                ...categoryFound,
                deleted: categoryData.deleted || false 
            });

            if (!updatedCategory) {
                throw new Error(`Could not update category with ID ${categoryId}`);
            }

            return updatedCategory;
        } catch (error: any) {
            throw new Error(`Error updating category: ${error.message}`);
        }
    }

    public static async deleteCategory(categoryId: number): Promise<boolean> {
        try {
            return await CategoryRepository.deleteCategory(categoryId);
        } catch (error: any) {
            throw new Error(`Error deleting category: ${error.message}`);
        }
    }

    public static async deleteCategoryLogic(categoryId: number): Promise<boolean> {
        try {
            return await CategoryRepository.deleteCategoryLogic(categoryId);
        } catch (error: any) {
            throw new Error(`Error logically deleting category: ${error.message}`);
        }
    }
}
