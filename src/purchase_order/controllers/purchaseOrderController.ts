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

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: 'Invalid or empty products array' });
        }

        if (typeof user_id_fk !== 'number' || user_id_fk <= 0) {
            return res.status(400).json({ message: 'Invalid user_id_fk' });
        }

        if (typeof street !== 'string' || street.trim() === '') {
            return res.status(400).json({ message: 'Invalid street' });
        }
        if (typeof city !== 'string' || city.trim() === '') {
            return res.status(400).json({ message: 'Invalid city' });
        }

        let total = 0;
        let product_id_fk = 0;
        const productPromises = products.map(async (productId: number) => {
            const product = await ProductService.getProductById(productId);
            if (!product) {
                throw new Error(`Product with ID ${productId} not found`);
            }
            if (typeof product.price !== 'number' || isNaN(product.price) || product.price <= 0) {
                throw new Error(`Invalid price (${product.price}) for product ID ${productId}`);
            }
            total += product.price;
            product_id_fk = productId; // Assuming you want to use the last product's ID
        });

        try {
            await Promise.all(productPromises);
        } catch (error: any) {
            return res.status(404).json({ message: error.message });
        }

        if (typeof total !== 'number' || isNaN(total) || !isFinite(total)) {
            return res.status(400).json({ message: 'Invalid total amount' });
        }

        const newPurchaseOrder: PurchaseOrder = {
            purchaseOrder_id: null,
            date: DateUtils.formatDate(new Date()), 
            total: total,
            product_id_fk: product_id_fk,
            user_id_fk: user_id_fk,
            street: street,
            city: city,
            status_id_fk: 1, 
            created_by: 'API',
            updated_by: 'API',
            created_at: DateUtils.formatDate(new Date()),
            updated_at: DateUtils.formatDate(new Date()),
            deleted: false,
        };
      
        const createdPurchaseOrder = await PurchaseOrderService.addPurchaseOrder(newPurchaseOrder);

        return res.status(201).json(createdPurchaseOrder);
    } catch (error: any) {
        return res.status(500).json({ message: `Error creating purchase order: ${error.message}` });
    }
};


export const updatePurchaseOrder = async (req: Request, res: Response): Promise<Response> => {
    const { purchaseOrder_id } = req.params;
    const { products, date, user_id_fk, street, city, status_id_fk, updated_by, deleted } = req.body;
    try {
        const existingPurchaseOrder = await PurchaseOrderService.getPurchaseOrderById(Number(purchaseOrder_id));
        if (!existingPurchaseOrder) {
            return res.status(404).json({ message: `Purchase order not found` });
        }

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: 'Invalid products array' });
        }

        if (typeof user_id_fk !== 'number' || user_id_fk <= 0) {
            return res.status(400).json({ message: 'Invalid user_id_fk' });
        }

        if (typeof street !== 'string' || street.trim() === '') {
            return res.status(400).json({ message: 'Invalid street' });
        }

        if (typeof city !== 'string' || city.trim() === '') {
            return res.status(400).json({ message: 'Invalid city' });
        }

        let newTotal = 0;
        let newProduct_id_fk = 0;
        const productPromises = products.map(async (productId: number) => {
            const product = await ProductService.getProductById(productId);
            if (!product) {
                throw new Error(`Product with ID ${productId} not found`);
            }
            if (typeof product.price !== 'number' || isNaN(product.price) || product.price <= 0) {
                throw new Error(`Invalid price (${product.price}) for product ID ${productId}`);
            }
            newTotal += product.price;
            newProduct_id_fk = productId;
        });

        try {
            await Promise.all(productPromises);
        } catch (error: any) {
            return res.status(404).json({ message: error.message });
        }

        if (typeof newTotal !== 'number' || isNaN(newTotal) || !isFinite(newTotal)) {
            return res.status(400).json({ message: 'Invalid total amount' });
        }

        const updatedPurchaseOrderData: PurchaseOrder = {
            ...existingPurchaseOrder,
            date: date || existingPurchaseOrder.date,
            total: newTotal,
            product_id_fk: newProduct_id_fk,
            user_id_fk: user_id_fk || existingPurchaseOrder.user_id_fk,
            street: street || existingPurchaseOrder.street,
            city: city || existingPurchaseOrder.city,
            status_id_fk: status_id_fk || existingPurchaseOrder.status_id_fk,
            updated_at: DateUtils.formatDate(new Date()),
            updated_by: updated_by || 'API',
            deleted: deleted !== undefined ? deleted : existingPurchaseOrder.deleted
        };

        const updatedPurchaseOrder = await PurchaseOrderService.updatePurchaseOrder(Number(purchaseOrder_id), updatedPurchaseOrderData);
        return res.status(200).json(updatedPurchaseOrder);
    } catch (error: any) {
        return res.status(500).json({ message: `Error updating purchase order: ${error.message}` });
    }
};

export const deletePurchaseOrder = async (req: Request, res: Response): Promise<Response> => {
    const { purchaseOrder_id } = req.params;
    try {
        const success = await PurchaseOrderService.deletePurchaseOrder(Number(purchaseOrder_id));
        if (success) {
            return res.status(200).json({ message: `Purchase order deleted successfully` });
        } else {
            return res.status(404).json({ message: `Purchase order not found` });
        }
    } catch (error: any) {
        return res.status(500).json({ message: `Error deleting purchase order: ${error.message}` });
    }
};

export const deletePurchaseOrderLogic = async (req: Request, res: Response): Promise<Response> => {
    const { purchaseOrder_id } = req.params;
    try {
        const success = await PurchaseOrderService.deleteLogicalPurchaseOrder(Number(purchaseOrder_id));
        if (success) {
            return res.status(200).json({ message: `Purchase order deleted logically` });
        } else {
            return res.status(404).json({ message: `Purchase order not found` });
        }
    } catch (error: any) {
        return res.status(500).json({ message: `Error deleting purchase order logically: ${error.message}` });
    }
};
