import { Router } from "express";
import { getAllPurchaseOrders, getPurchaseOrderById,createPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder, deletePurchaseOrderLogic } from "../controllers/purchaseOrderController";

const purchaseOrderRoutes: Router = Router();

purchaseOrderRoutes.put('/deleted/:purchaseOrder_id', deletePurchaseOrderLogic); 
purchaseOrderRoutes.get('/', getAllPurchaseOrders); 
purchaseOrderRoutes.get('/:purchaseOrder_id', getPurchaseOrderById);
purchaseOrderRoutes.post('/',  createPurchaseOrder);
purchaseOrderRoutes.put('/:purchaseOrder_id', updatePurchaseOrder); 
purchaseOrderRoutes.delete('/:purchaseOrder_id', deletePurchaseOrder); 

export default purchaseOrderRoutes;
