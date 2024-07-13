// controllers/CategoryController.ts
import { Request, Response } from "express";
import { CategoryService } from "../services/categoryService";

export const getAllCategories = async (_req: Request, res: Response) => {
    try {
        const categories = await CategoryService.getAllCategories();
        res.status(200).json(categories);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const categoryId = parseInt(req.params.category_id, 10);
        const category = await CategoryService.getCategoryById(categoryId);

        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const addCategory = async (req: Request, res: Response) => {
    try {
        const newCategory = await CategoryService.addCategory(req.body);
        res.status(201).json(newCategory);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const categoryId = parseInt(req.params.category_id, 10);
        const updatedCategory = await CategoryService.updateCategory(categoryId, req.body);

        if (updatedCategory) {
            res.status(200).json(updatedCategory);
        } else {
            res.status(404).json({ message: `Category with ID ${categoryId} not found` });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const categoryId = parseInt(req.params.category_id, 10);
        const deleted = await CategoryService.deleteCategory(categoryId);

        if (deleted) {
            res.status(200).json({ message: 'Category deleted successfully' });
        } else {
            res.status(404).json({ message: `Category with ID ${categoryId} not found` });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCategoryLogic = async (req: Request, res: Response) => {
    try {
        const categoryId = parseInt(req.params.category_id, 10);
        const deleted = await CategoryService.deleteCategoryLogic(categoryId);

        if (deleted) {
            res.status(200).json({ message: 'Category logically deleted successfully' });
        } else {
            res.status(404).json({ message: `Category with ID ${categoryId} not found` });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
