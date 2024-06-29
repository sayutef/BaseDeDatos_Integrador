import { Request, Response } from 'express';
import { userService } from '../services/userService';
import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET || '';

export const loginUser = async (req: Request, res: Response) => {
    const { name, password } = req.body;
    try {
        const token = await userService.login(name, password);

        if (!token) {
            res.status(401).json({ message: 'Invalid name or password' });
        } else {
            const payload = jwt.verify(token, secretKey) as any;
            res.status(200).json({ token, user_id: payload.user_id });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await userService.getAllUser();
        if(users){
            res.status(201).json(users);
          }else{
            res.status(404).json({ message: 'Sin registros' });
          }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.user_id, 10);
        const user = await userService.getUserById(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = await userService.addUser(req.body);
        if(newUser){
            res.status(201).json(newUser);
          }else{
            res.status(404).json({ message: 'Algo salio mal' });
          }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.user_id, 10);
        const updatedUser = await userService.modifyUser(userId, req.body);
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado o no se pudo actualizar.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.user_id, 10);
        const deleted = await userService.deletedUser(userId);
        if (deleted) {
            res.status(200).json({ message: 'Usuario eliminado correctamente.' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado o no se pudo eliminar.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteLogicalUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.user_id, 10);
        const success = await userService.deleteUserLogic(userId);
        if (success) {
            res.status(200).json({ message: 'User logically deleted successfully.' });
        } else {
            res.status(404).json({ message: 'User not found or already logically deleted.' });
        }
    } catch (error : any) {
        res.status(500).json({ error: error.message });
    }
};
