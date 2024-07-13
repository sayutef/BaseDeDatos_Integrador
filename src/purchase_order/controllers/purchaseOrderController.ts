import { Request, Response } from 'express';
import { PurchaseOrderService } from '../services/purchaseOrderServices';

export const getAllPurchaseOrder = async (_req: Request, res: Response) => {
    try {
        const purchaseOrders = await PurchaseOrderService.getAllPurchaseOrder();
        res.status(200).json(purchaseOrders);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getPurchaseOrderById = async (req: Request, res: Response) => {
    try {
        const purchaseOrderId = parseInt(req.params.purchaseOrder_id, 10);
        const purchaseOrder = await PurchaseOrderService.getPurchaseOrderById(purchaseOrderId);
        if (purchaseOrder) {
            res.status(200).json(purchaseOrder);
        } else {
            res.status(404).json({ message: 'Orden no encontrada.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createPurchaseOrder = async (req: Request, res: Response) => {
    try {
        const newPurchaseOrder = await PurchaseOrderService.addPurchaseOrder(req.body);
        res.status(201).json(newPurchaseOrder);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updatePurchaseOrder = async (req: Request, res: Response) => {
    try {
        const purchaseOrderId = parseInt(req.params.purchaseOrder_id, 10);
        const updatedPurchaseOrder = await PurchaseOrderService.modifyPurchaseOrder(purchaseOrderId, req.body);
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
        const deleted = await PurchaseOrderService.deletedPurchaseOrder(purchaseOrderId);
        if (deleted) {
            res.status(200).json({ message: 'Orden eliminada correctamente.' });
        } else {
            res.status(404).json({ message: 'Orden no encontrada o no se pudo eliminar.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteLogicalPurchaseOrder = async (req: Request, res: Response) => {
    try {
        const purchaseOrderId = parseInt(req.params.purchaseOrder_id, 10);
        const success = await PurchaseOrderService.deletePurchaseOrderLogic(purchaseOrderId);
        if (success) {
            res.status(200).json({ message: 'Orden eliminada lógicamente correctamente.' });
        } else {
            res.status(404).json({ message: 'Orden no encontrada o ya eliminada lógicamente.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
