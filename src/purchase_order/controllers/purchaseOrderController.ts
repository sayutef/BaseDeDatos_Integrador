import { Request, Response } from 'express';
import { purchaseOrderService } from '../services/purchaseOrder';

export const getAllPurchaseOrder = async (_req: Request, res: Response) => {
    try {
        const users = await purchaseOrderService.getAllPurchaseOrder();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getPurchaseOrderById = async (req: Request, res: Response) => {
    try {
        const purchaseOrderId = parseInt(req.params.purchaseOrder_id, 10);
        const user = await purchaseOrderService.getPurchaseOrderById(purchaseOrderId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Orden no encontrada.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createPurchaseOrder = async (req: Request, res: Response) => {
    try {
        const newPurchaseOrder = await purchaseOrderService.addPurchaseOrder(req.body);
        res.status(201).json(newPurchaseOrder);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updatePurchaseOrder = async (req: Request, res: Response) => {
    try {
        const purchaseOrderId = parseInt(req.params.purchaseOrder_id, 10);
        const updatedPurchaseOrder = await purchaseOrderService.modifyPurchaseOrder(purchaseOrderId, req.body);
        if (updatedPurchaseOrder) {
            res.status(200).json(updatedPurchaseOrder);
        } else {
            res.status(404).json({ message: 'Orden no encontrada o no se pudo actualizar.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deletePurchaseOrder = async (req: Request, res: Response) => {
    try {
        const purchaseOrderId = parseInt(req.params.purchaseOrder_id, 10);
        const deleted = await purchaseOrderService.deletedPurchaseOrder(purchaseOrderId);
        if (deleted) {
            res.status(200).json({ message: 'Orden eliminada correctamente.' });
        } else {
            res.status(404).json({ message: 'Orden no encontrada o no se pudo eliminar.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
