
import { Request, Response } from 'express';
import { StatusService } from '../service/statusService';

export const getAllStatuses = async (_req: Request, res: Response) => {
    try {
        const statuses = await StatusService.getAllStatuses();
        res.status(200).json(statuses);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getStatusById = async (req: Request, res: Response) => {
    try {
        const statusId = parseInt(req.params.status_id, 10);
        const status = await StatusService.getStatusById(statusId);
        if (status) {
            res.status(200).json(status);
        } else {
            res.status(404).json({ message: 'Estado no encontrado.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createStatus = async (req: Request, res: Response) => {
    try {
        const newStatus = await StatusService.addStatus(req.body);
        res.status(201).json(newStatus);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateStatus = async (req: Request, res: Response) => {
    try {
        const statusId = parseInt(req.params.status_id, 10);
        const updatedStatus = await StatusService.modifyStatus(statusId, req.body);
        if (updatedStatus) {
            res.status(200).json(updatedStatus);
        } else {
            res.status(404).json({ message: 'Estado no encontrado o no se pudo actualizar.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteStatus = async (req: Request, res: Response) => {
    try {
        const statusId = parseInt(req.params.status_id, 10);
        const deleted = await StatusService.deleteStatus(statusId);
        if (deleted) {
            res.status(200).json({ message: 'Estado eliminado correctamente.' });
        } else {
            res.status(404).json({ message: 'Estado no encontrado o no se pudo eliminar.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteLogicalStatus = async (req: Request, res: Response) => {
    try {
        const statusId = parseInt(req.params.status_id, 10);
        const success = await StatusService.deleteStatusLogic(statusId);
        if (success) {
            res.status(200).json({ message: 'Estado eliminado lógicamente correctamente.' });
        } else {
            res.status(404).json({ message: 'Estado no encontrado o ya eliminado lógicamente.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
