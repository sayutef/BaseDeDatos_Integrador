import { Request, Response } from "express";
import { PurchaseOrderService } from "../services/purchaseOrderServices";
import { PurchaseOrder } from "../models/PurchaseOrder";

export const getAllPurchaseOrder = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const purchaseOrders = await PurchaseOrderService.getAllPurchaseOrder();
        return res.status(200).json(purchaseOrders);
    } catch (error: any) {
        return res.status(500).json({ message: `Error al obtener las órdenes de compra: ${error.message}` });
    }
};

export const getPurchaseOrderById = async (req: Request, res: Response): Promise<Response> => {
    const { purchaseOrder_id } = req.params;
    try {
        const purchaseOrder = await PurchaseOrderService.getPurchaseOrderById(Number(purchaseOrder_id));
        if (purchaseOrder) {
            return res.status(200).json(purchaseOrder);
        } else {
            return res.status(404).json({ message: `Orden de compra no encontrada` });
        }
    } catch (error: any) {
        return res.status(500).json({ message: `Error al obtener la orden de compra: ${error.message}` });
    }
};

export const createPurchaseOrder = async (req: Request, res: Response): Promise<Response> => {
    const purchaseOrderData: PurchaseOrder = req.body;
    try {
        const purchaseOrder = await PurchaseOrderService.addPurchaseOrder(purchaseOrderData);
        return res.status(201).json(purchaseOrder);
    } catch (error: any) {
        return res.status(500).json({ message: `Error al crear la orden de compra: ${error.message}` });
    }
};

export const updatePurchaseOrder = async (req: Request, res: Response): Promise<Response> => {
    const { purchaseOrder_id } = req.params;
    const purchaseOrderData: PurchaseOrder = req.body;
    try {
        const updatedPurchaseOrder = await PurchaseOrderService.modifyPurchaseOrder(Number(purchaseOrder_id), purchaseOrderData);
        if (updatedPurchaseOrder) {
            return res.status(200).json(updatedPurchaseOrder);
        } else {
            return res.status(404).json({ message: `Orden de compra no encontrada` });
        }
    } catch (error: any) {
        return res.status(500).json({ message: `Error al actualizar la orden de compra: ${error.message}` });
    }
};

export const deletePurchaseOrder = async (req: Request, res: Response): Promise<Response> => {
    const { purchaseOrder_id } = req.params;
    try {
        const deleted = await PurchaseOrderService.deletedPurchaseOrder(Number(purchaseOrder_id));
        if (deleted) {
            return res.status(200).json({ message: `Orden de compra eliminada` });
        } else {
            return res.status(404).json({ message: `Orden de compra no encontrada` });
        }
    } catch (error: any) {
        return res.status(500).json({ message: `Error al eliminar la orden de compra: ${error.message}` });
    }
};

export const deleteLogicalPurchaseOrder = async (req: Request, res: Response): Promise<Response> => {
    const { purchaseOrder_id } = req.params;
    try {
        const deleted = await PurchaseOrderService.deletedLogicalPurchaseOrder(Number(purchaseOrder_id));
        if (deleted) {
            return res.status(200).json({ message: `Orden de compra eliminada lógicamente` });
        } else {
            return res.status(404).json({ message: `Orden de compra no encontrada` });
        }
    } catch (error: any) {
        return res.status(500).json({ message: `Error al eliminar la orden de compra lógicamente: ${error.message}` });
    }
};
