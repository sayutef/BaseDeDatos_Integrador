import { Router } from "express";
import { getAllPurchaseOrders, getPurchaseOrderById,createPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder, deletePurchaseOrderLogic } from "../controllers/purchaseOrderController";
import { authMiddleware } from "../../shared/middlewares/auth";
const purchaseOrderRoutes: Router = Router();

purchaseOrderRoutes.put('/deleted/:purchaseOrder_id',authMiddleware,  deletePurchaseOrderLogic); 
purchaseOrderRoutes.get('/', authMiddleware, getAllPurchaseOrders); 
purchaseOrderRoutes.get('/:purchaseOrder_id', authMiddleware, getPurchaseOrderById);
purchaseOrderRoutes.post('/',  authMiddleware, createPurchaseOrder);
purchaseOrderRoutes.put('/:purchaseOrder_id',authMiddleware,  updatePurchaseOrder); 
purchaseOrderRoutes.delete('/:purchaseOrder_id',authMiddleware,  deletePurchaseOrder); 

export default purchaseOrderRoutes;
