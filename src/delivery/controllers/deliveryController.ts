import { Request, Response } from 'express';
import { deliveryService } from '../services/deliveryService';

export const getAllDelivery = async (_req: Request, res: Response) => {
    try {
        const delivery = await deliveryService.getAllDelivery();
        res.status(200).json(delivery);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getDeliveryById = async (req: Request, res: Response) => {
    try {
        const deliveryId = parseInt(req.params.delivery_id, 10);
        const delivery = await deliveryService.getDeliveryById(deliveryId);
        if (delivery) {
            res.status(200).json(delivery);
        } else {
            res.status(404).json({ message: 'Delivery no encontrado.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createDelivery = async (req: Request, res: Response) => {
    try {
        const newDelivery = await deliveryService.addDelivery(req.body);
        res.status(201).json(newDelivery);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateDelivery = async (req: Request, res: Response) => {
    try {
        const deliveryId = parseInt(req.params.delivery_id, 10);
        const updatedDelivery = await deliveryService.modifyDelivery(deliveryId, req.body);
        if (updatedDelivery) {
            res.status(200).json(updatedDelivery);
        } else {
            res.status(404).json({ message: 'Delivery no encontrado o no se pudo actualizar.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteDelivery = async (req: Request, res: Response) => {
    try {
        const deliveryId = parseInt(req.params.delivery_id, 10);
        const deleted = await deliveryService.deleteDelivery(deliveryId);
        if (deleted) {
            res.status(200).json({ message: 'Delivery eliminado correctamente.' });
        } else {
            res.status(404).json({ message: 'Delivery no encontrado o no se pudo eliminar.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteLogicalDelivery = async (req: Request, res: Response) => {
    try {
        const deliveryId = parseInt(req.params.delivery_id, 10);
        const success = await deliveryService.deleteDeliveryLogic(deliveryId);
        if (success) {
            res.status(200).json({ message: 'Delivery eliminado lógicamente correctamente.' });
        } else {
            res.status(404).json({ message: 'Delivery no encontrado o ya eliminado lógicamente.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
