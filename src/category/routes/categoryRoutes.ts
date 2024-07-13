import { Router } from 'express';
import { getAllCategories,getCategoryById,addCategory,updateCategory,deleteCategory,deleteCategoryLogic } from '../controller/categoryController';
import { authMiddleware } from '../../shared/middlewares/auth';

const categoryRoutes = Router();

categoryRoutes.get('/', authMiddleware, getAllCategories);
categoryRoutes.get('/:category_id', authMiddleware, getCategoryById);
categoryRoutes.post('/', authMiddleware, addCategory);
categoryRoutes.put('/:category_id', authMiddleware, updateCategory);
categoryRoutes.delete('/:category_id', authMiddleware, deleteCategory);
categoryRoutes.put('/:category_id/logic', authMiddleware, deleteCategoryLogic);

export default categoryRoutes;
