import { Router } from "express";
import { getAllPurchaseOrder,getPurchaseOrderById,createPurchaseOrder,updatePurchaseOrder,deletePurchaseOrder } from "../controllers/purchaseOrderController";

const purchaseOrderRoutes: Router = Router();

purchaseOrderRoutes.get('/', getAllPurchaseOrder); 
purchaseOrderRoutes.get('/:purchaseOrder_id', getPurchaseOrderById);
purchaseOrderRoutes.post('/', createPurchaseOrder);
purchaseOrderRoutes.put('/:purchaseOrder_id', updatePurchaseOrder); 
purchaseOrderRoutes.delete('/:purchaseOrder_id', deletePurchaseOrder); 

export default purchaseOrderRoutes;