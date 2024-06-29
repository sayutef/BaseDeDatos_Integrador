import { Router } from "express";
import { getAllUsers, getUserById, updateUser, createUser, deleteUser,loginUser ,deleteLogicalUser} from "../controllers/userController";
import { authMiddleware } from "../../shared/middlewares/auth";

const userRoutes: Router = Router();

userRoutes.post('/login',loginUser)

userRoutes.get('/', authMiddleware, getAllUsers);
userRoutes.get('/:user_id', authMiddleware, getUserById);
userRoutes.put('/:user_id', authMiddleware,updateUser);
userRoutes.post('/', createUser,deleteLogicalUser);
userRoutes.put('/deleted/:user_id/', authMiddleware, deleteLogicalUser);
userRoutes.delete('/:user_id', authMiddleware, deleteUser);


export default userRoutes;
