import { Router } from 'express';
import { getAllCategories,getCategoryById,addCategory,updateCategory,deleteCategory,deleteCategoryLogic } from '../controller/categoryController';


const categoryRoutes = Router();

categoryRoutes.get('/', getAllCategories);
categoryRoutes.get('/:category_id', getCategoryById);
categoryRoutes.post('/', addCategory);
categoryRoutes.put('/:category_id',  updateCategory);
categoryRoutes.delete('/:category_id',  deleteCategory);
categoryRoutes.put('/:category_id/logic',  deleteCategoryLogic);

export default categoryRoutes;
