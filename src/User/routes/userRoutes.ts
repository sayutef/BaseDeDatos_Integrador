import { Router } from "express";
import { getAllUsers, getUserById, updateUser, createUser, deleteUser, loginUser, deleteLogicalUser, getEmpleados, getAdministradores, getClientes } from "../controllers/userController";


const userRoutes: Router = Router();

userRoutes.post('/login', loginUser);

userRoutes.get('/',  getAllUsers);
userRoutes.get('/empleados',  getEmpleados);
userRoutes.get('/administradores',  getAdministradores);
userRoutes.get('/clientes',  getClientes);
userRoutes.get('/:user_id', getUserById);
userRoutes.put('/:user_id',updateUser);
userRoutes.post('/', createUser);
userRoutes.put('/deleted/:user_id',  deleteLogicalUser);
userRoutes.delete('/:user_id',  deleteUser);

export default userRoutes;
