import { Router } from "express";
import { getAllDelivery,getDeliveryById,createDelivery,updateDelivery,deleteDelivery,deleteLogicalDelivery } from "../controllers/deliveryController";
import { authMiddleware } from "../../shared/middlewares/auth";
const deliveryRoutes: Router = Router();

deliveryRoutes.put('/deleted/:user_id',authMiddleware,deleteLogicalDelivery ); 
deliveryRoutes.get('/',authMiddleware, getAllDelivery); 
deliveryRoutes.get('/:delivery_id', authMiddleware,getDeliveryById);
deliveryRoutes.post('/',authMiddleware, createDelivery);
deliveryRoutes.put('/:delivery_id', authMiddleware,updateDelivery); 
deliveryRoutes.delete('/:delivery_id', authMiddleware,deleteDelivery); 

export default deliveryRoutes;
