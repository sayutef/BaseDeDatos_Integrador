import { Request, Response } from 'express';
import { PurchaseOrderService } from '../services/purchaseOrderServices';
import { PurchaseOrder } from '../models/PurchaseOrder';
import { DateUtils } from '../../shared/utils/DateUtils';
import { ProductService } from '../../product/services/productService';

export const getAllPurchaseOrders = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const purchaseOrders = await PurchaseOrderService.getAllPurchaseOrders();
        return res.status(200).json(purchaseOrders);
    } catch (error: any) {
        return res.status(500).json({ message: `Error retrieving purchase orders: ${error.message}` });
    }
};

export const getPurchaseOrderById = async (req: Request, res: Response): Promise<Response> => {
    const { purchaseOrder_id } = req.params;
    try {
        const purchaseOrder = await PurchaseOrderService.getPurchaseOrderById(Number(purchaseOrder_id));
        if (purchaseOrder) {
            return res.status(200).json(purchaseOrder);
        } else {
            return res.status(404).json({ message: `Purchase order not found` });
        }
    } catch (error: any) {
        return res.status(500).json({ message: `Error finding purchase order: ${error.message}` });
    }
};

export const createPurchaseOrder = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { products, user_id_fk, street, city } = req.body;

        // Validar que products sea un arreglo no vacío
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: 'Invalid products array' });
        }

        // Validar user_id_fk sea un número positivo
        if (typeof user_id_fk !== 'number' || user_id_fk <= 0) {
            return res.status(400).json({ message: 'Invalid user_id_fk' });
        }

        // Validar street y city sean cadenas no vacías
        if (typeof street !== 'string' || street.trim() === '') {
            return res.status(400).json({ message: 'Invalid street' });
        }
        if (typeof city !== 'string' || city.trim() === '') {
            return res.status(400).json({ message: 'Invalid city' });
        }

        // Verificar que todos los productos existan y calcular el total
        let total = 0;
        const productPromises = products.map(async (productId: number) => {
            const product = await ProductService.getProductById(productId);
            if (!product) {
                throw new Error(`Product with ID ${productId} not found`);
            }
            if (typeof product.price !== 'number' || isNaN(product.price) || product.price <= 0) {
                throw new Error(`Invalid price (${product.price}) for product ID ${productId}`);
            }
            total += product.price;
        });

        try {
            await Promise.all(productPromises);
        } catch (error:any) {
            return res.status(404).json({ message: error.message });
        }

        // Validar que total sea un número válido
        if (typeof total !== 'number' || isNaN(total) || !isFinite(total)) {
            return res.status(400).json({ message: 'Invalid total amount' });
        }

        // Crear el objeto de la orden de compra
        const newPurchaseOrder: PurchaseOrder = {
            purchaseOrder_id: null,
            date: DateUtils.formatDate(new Date()), // Ejemplo de formato de fecha ISO
            total: total,
            user_id_fk: user_id_fk,
            street: street,
            city: city,
            status_id_fk: 1, // Estado inicial de la orden (pendiente)
            created_by: 'API',
            updated_by: 'API',
            created_at: DateUtils.formatDate(new Date()),
            updated_at: DateUtils.formatDate(new Date()),
            deleted: false,
        };

        // Guardar la orden de compra en la base de datos usando el servicio
        const createdPurchaseOrder = await PurchaseOrderService.addPurchaseOrder(newPurchaseOrder);

        // Si se crea correctamente, responder con la orden creada
        return res.status(201).json(createdPurchaseOrder);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const updatePurchaseOrder = async (req: Request, res: Response): Promise<Response> => {
    const { purchaseOrder_id } = req.params;
    const purchaseOrderData: Partial<PurchaseOrder> = req.body;
    try {
        const updatedPurchaseOrder = await PurchaseOrderService.updatePurchaseOrder(
            Number(purchaseOrder_id),
            purchaseOrderData
        );
        if (updatedPurchaseOrder) {
            return res.status(200).json(updatedPurchaseOrder);
        } else {
            return res.status(404).json({ message: `Purchase order not found` });
        }
    } catch (error: any) {
        return res.status(500).json({ message: `Error modifying purchase order: ${error.message}` });
    }
};

export const deletePurchaseOrder = async (req: Request, res: Response): Promise<Response> => {
    const { purchaseOrder_id } = req.params;
    try {
        const result = await PurchaseOrderService.deletePurchaseOrder(Number(purchaseOrder_id));
        if (result) {
            return res.status(204).json({ message: `Purchase order deleted successfully` });
        } else {
            return res.status(404).json({ message: `Purchase order not found` });
        }
    } catch (error: any) {
        return res.status(500).json({ message: `Error deleting purchase order: ${error.message}` });
    }
};

export const deleteLogicalPurchaseOrder = async (req: Request, res: Response): Promise<Response> => {
    const { purchaseOrder_id } = req.params;
    try {
        const result = await PurchaseOrderService.deleteLogicalPurchaseOrder(Number(purchaseOrder_id));
        if (result) {
            return res.status(204).json({ message: `Purchase order logically deleted successfully` });
        } else {
            return res.status(404).json({ message: `Purchase order not found` });
        }
    } catch (error: any) {
        return res.status(500).json({ message: `Error logically deleting purchase order: ${error.message}` });
    }
};
