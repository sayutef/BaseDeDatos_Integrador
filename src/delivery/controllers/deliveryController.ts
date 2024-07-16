import { Request, Response } from 'express';
import { DeliveryService } from '../services/deliveryService';

export const getAllDelivery = async (_req: Request, res: Response) => {
    try {
        const deliveries = await DeliveryService.getAllDelivery();
        res.status(200).json(deliveries);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getDeliveryById = async (req: Request, res: Response) => {
    try {
        const deliveryId = parseInt(req.params.delivery_id, 10);
        const delivery = await DeliveryService.getDeliveryById(deliveryId);
        if (delivery) {
            res.status(200).json(delivery);
        } else {
            res.status(404).json({ message: 'Entrega no encontrada.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createDelivery = async (req: Request, res: Response) => {
    try {
        const newDelivery = await DeliveryService.addDelivery(req.body);
        res.status(201).json(newDelivery);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateDelivery = async (req: Request, res: Response) => {
    try {
        const deliveryId = parseInt(req.params.delivery_id, 10);
        const updatedDelivery = await DeliveryService.modifyDelivery(deliveryId, req.body);
        if (updatedDelivery) {
            res.status(200).json(updatedDelivery);
        } else {
            res.status(404).json({ message: 'Entrega no encontrada o no se pudo actualizar.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteDelivery = async (req: Request, res: Response) => {
    try {
        const deliveryId = parseInt(req.params.delivery_id, 10);
        const deleted = await DeliveryService.deleteDelivery(deliveryId);
        if (deleted) {
            res.status(200).json({ message: 'Entrega eliminada correctamente.' });
        } else {
            res.status(404).json({ message: 'Entrega no encontrada o no se pudo eliminar.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteLogicalDelivery = async (req: Request, res: Response) => {
    try {
        const deliveryId = parseInt(req.params.delivery_id, 10);
        const success = await DeliveryService.deleteDeliveryLogic(deliveryId);
        if (success) {
            res.status(200).json({ message: 'Entrega eliminada lógicamente correctamente.' });
        } else {
            res.status(404).json({ message: 'Entrega no encontrada o ya eliminada lógicamente.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
