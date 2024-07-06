import { Router } from "express";
import { getAllRoles, getRoleById, createRole, updateRole, deleteRole, deleteLogicalUser } from "../controllers/roleController";

const roleRoutes: Router = Router();

roleRoutes.put('/deleted/:user_id', deleteLogicalUser); 
roleRoutes.get('/', getAllRoles); 
roleRoutes.get('/:role_id', getRoleById);
roleRoutes.post('/', createRole);
roleRoutes.put('/:role_id', updateRole); 
roleRoutes.delete('/:role_id', deleteRole); 

export default roleRoutes;
