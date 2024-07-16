import { Router } from "express";
import { getAllUsers, getUserById, updateUser, createUser, deleteUser, loginUser, deleteLogicalUser, getEmpleados, getAdministradores, getClientes } from "../controllers/userController";
import { authMiddleware } from "../../shared/middlewares/auth";

const userRoutes: Router = Router();

userRoutes.post('/login', loginUser);

userRoutes.get('/', authMiddleware, getAllUsers);
userRoutes.get('/empleados', authMiddleware, getEmpleados);
userRoutes.get('/administradores', authMiddleware, getAdministradores);
userRoutes.get('/clientes', authMiddleware, getClientes);
userRoutes.get('/:user_id', authMiddleware, getUserById);
userRoutes.put('/:user_id', authMiddleware, updateUser);
userRoutes.post('/', createUser);
userRoutes.put('/deleted/:user_id', authMiddleware, deleteLogicalUser);
userRoutes.delete('/:user_id', authMiddleware, deleteUser);

export default userRoutes;
