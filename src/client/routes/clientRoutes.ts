import { Router } from "express";
import { getAllClients,getClientById,addClient,updateClient,deleteClient } from "../controller/clientController";

const clientRoutes: Router = Router();

clientRoutes.get('/', getAllClients);
clientRoutes.get('/:client_id', getClientById);
clientRoutes.post('/', addClient);
clientRoutes.put('/:client_id', updateClient);
clientRoutes.delete('/:client_id', deleteClient);

export default clientRoutes;
