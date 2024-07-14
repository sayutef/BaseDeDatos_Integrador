import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET || '';

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const token = await UserService.login(email, password);

        if (!token) {
            res.status(401).json({ message: 'Invalid email or password' });
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
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.user_id, 10);
    try {
        const user = await UserService.getUserById(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        
        const exists = await UserService.userExists(email);
        if (exists) {
            res.status(409).json({ message: 'User already exists' });
            return;
        }

        const newUser = await UserService.addUser(req.body);
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.user_id, 10);
    try {
        const updatedUser = await UserService.modifyUser(userId, req.body);
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found or could not be updated' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.user_id, 10);
    try {
        const deleted = await UserService.deleteUser(userId);
        if (deleted) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found or could not be deleted' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteLogicalUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.user_id, 10);
    try {
        const success = await UserService.deleteUserLogic(userId);
        if (success) {
            res.status(200).json({ message: 'User logically deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found or already logically deleted' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const userExists = async (req: Request, res: Response) => {
    const { identifier } = req.params;
    try {
        const exists = await UserService.userExists(identifier);
        res.json({ exists });
    } catch (error : any) {
        res.status(500).json({ message: error.message });
    }
};
