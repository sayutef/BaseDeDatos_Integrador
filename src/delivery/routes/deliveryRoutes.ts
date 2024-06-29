import { Router } from "express";
import { getAllDelivery,getDeliveryById,createDelivery,updateDelivery,deleteDelivery } from "../controllers/deliveryController";

const deliveryRoutes: Router = Router();

deliveryRoutes.get('/', getAllDelivery); 
deliveryRoutes.get('/:delivery_id', getDeliveryById);
deliveryRoutes.post('/', createDelivery);
deliveryRoutes.put('/:delivery_id', updateDelivery); 
deliveryRoutes.delete('/:delivery_id', deleteDelivery); 

export default deliveryRoutes;
