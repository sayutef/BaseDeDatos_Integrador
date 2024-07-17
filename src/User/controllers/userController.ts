import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET || '';

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const token = await UserService.login(email, password);

        if (!token) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

    
        const user = await UserService.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verificar y decodificar el token JWT para obtener datos adicionales
        const payload = jwt.verify(token, secretKey) as { user_id: number };

        // Devolver el token JWT junto con el rol del usuario y el user_id del payload
        return res.status(200).json({ token, role: user.role_id_fk, user_id: payload.user_id });
    } catch (error: any) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await UserService.getAllUsers();
        return res.status(200).json(users);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.user_id, 10);
    try {
        const user = await UserService.getUserById(userId);
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const getEmpleados = async (_req: Request, res: Response) => {
    try {
        const empleados = await UserService.getEmpleados();
        return res.status(200).json(empleados);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const getAdministradores = async (_req: Request, res: Response) => {
    try {
        const administradores = await UserService.getAdministradores();
        return res.status(200).json(administradores);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const getClientes = async (_req: Request, res: Response) => {
    try {
        const clientes = await UserService.getClientes();
        return res.status(200).json(clientes);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        
        const exists = await UserService.userExists(email);
        if (exists) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const newUser = await UserService.addUser(req.body);
        return res.status(201).json(newUser);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.user_id, 10);
    try {
        const updatedUser = await UserService.modifyUser(userId, req.body);
        if (updatedUser) {
            return res.status(200).json(updatedUser);
        } else {
            return res.status(404).json({ message: 'User not found or could not be updated' });
        }
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
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
            return res.status(200).json({ message: 'User logically deleted successfully' });
        } else {
            return res.status(404).json({ message: 'User not found or already logically deleted' });
        }
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};
