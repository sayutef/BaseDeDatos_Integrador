import { Router } from "express";
import { getAllPurchaseOrder,getPurchaseOrderById,createPurchaseOrder,updatePurchaseOrder,deletePurchaseOrder } from "../controllers/purchaseOrderController";
import { authMiddleware } from "../../shared/middlewares/auth";

const purchaseOrderRoutes: Router = Router();

purchaseOrderRoutes.get('/', authMiddleware,getAllPurchaseOrder); 
purchaseOrderRoutes.get('/:purchaseOrder_id',authMiddleware, getPurchaseOrderById);
purchaseOrderRoutes.post('/', authMiddleware,createPurchaseOrder);
purchaseOrderRoutes.put('/:purchaseOrder_id', authMiddleware,updatePurchaseOrder); 
purchaseOrderRoutes.delete('/:purchaseOrder_id', authMiddleware, deletePurchaseOrder); 

export default purchaseOrderRoutes;