import { Router } from "express";
import { getAllClients,getClientById,addClient,updateClient,deleteClient } from "../controller/clientController";
import { authMiddleware } from "../../shared/middlewares/auth";

const clientRoutes: Router = Router();

clientRoutes.get('/', authMiddleware,getAllClients);
clientRoutes.get('/:client_id', authMiddleware,getClientById);
clientRoutes.post('/', authMiddleware,addClient);
clientRoutes.put('/:client_id', authMiddleware,updateClient);
clientRoutes.delete('/:client_id', authMiddleware,deleteClient);

export default clientRoutes;
