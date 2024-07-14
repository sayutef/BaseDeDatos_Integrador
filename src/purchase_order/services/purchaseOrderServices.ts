import { PurchaseOrderRepository } from "../repositories/PurchaseOrderRepository";
import { PurchaseOrder } from "../models/PurchaseOrder";
import { DateUtils } from "../../shared/utils/DateUtils";

export class PurchaseOrderService {

    public static async getAllPurchaseOrder(): Promise<PurchaseOrder[]> {
        try {
            return await PurchaseOrderRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener las órdenes de compra: ${error.message}`);
        }
    }

    public static async getPurchaseOrderById(purchaseOrderId: number): Promise<PurchaseOrder | null> {
        try {
            return await PurchaseOrderRepository.findById(purchaseOrderId);
        } catch (error: any) {
            throw new Error(`Error al encontrar la orden de compra: ${error.message}`);
        }
    }

    public static async addPurchaseOrder(purchaseOrder: PurchaseOrder): Promise<PurchaseOrder> {
        try {
            const currentDate = new Date();
            purchaseOrder.date = DateUtils.formatDate(currentDate);
            purchaseOrder.created_at = DateUtils.formatDate(currentDate);
            purchaseOrder.updated_at = DateUtils.formatDate(currentDate);

            return await PurchaseOrderRepository.createPurchaseOrder(purchaseOrder);
        } catch (error: any) {
            throw new Error(`Error al crear la orden de compra: ${error.message}`);
        }
    }

    public static async modifyPurchaseOrder(purchaseOrderId: number, purchaseOrderData: PurchaseOrder): Promise<PurchaseOrder | null> {
        try {
            const purchaseOrderFound = await PurchaseOrderRepository.findById(purchaseOrderId);
            
            if (purchaseOrderFound) {
                if (purchaseOrderData.date) {
                    purchaseOrderFound.date = purchaseOrderData.date;
                }
                if (purchaseOrderData.total) {
                    purchaseOrderFound.total = purchaseOrderData.total;
                }
                if (purchaseOrderData.client_id_fk) {
                    purchaseOrderFound.client_id_fk = purchaseOrderData.client_id_fk;
                }
                if (purchaseOrderData.street) {
                    purchaseOrderFound.street = purchaseOrderData.street;
                }
                if (purchaseOrderData.city) {
                    purchaseOrderFound.city = purchaseOrderData.city;
                }
                if (purchaseOrderData.status_id_fk) {
                    purchaseOrderFound.status_id_fk = purchaseOrderData.status_id_fk;
                }
                if (purchaseOrderData.updated_by) {
                    purchaseOrderFound.updated_by = purchaseOrderData.updated_by;
                }
                if (purchaseOrderData.deleted !== undefined) {
                    purchaseOrderFound.deleted = purchaseOrderData.deleted;
                }
                purchaseOrderFound.updated_at = DateUtils.formatDate(new Date());
                
                const updatedPurchaseOrder = await PurchaseOrderRepository.updatePurchaseOrder(purchaseOrderId, purchaseOrderFound);
                return updatedPurchaseOrder;
            } else {
                return null; 
            }
        } catch (error: any) {
            throw new Error(`Error al modificar la orden de compra: ${error.message}`);
        }
    }
    
    public static async deletedPurchaseOrder(purchaseOrderId: number): Promise<boolean> {
        try {
            return await PurchaseOrderRepository.deletePurchaseOrder(purchaseOrderId);
        } catch (error: any) {
            throw new Error(`Error al eliminar la orden de compra: ${error.message}`);
        }
    }

    public static async deletedLogicalPurchaseOrder(purchaseOrderId: number): Promise<boolean> {
        try {
            return await PurchaseOrderRepository.deletePurchaseLogic(purchaseOrderId);
        } catch (error: any) {
            throw new Error(`Error al eliminar la orden de compra lógicamente: ${error.message}`);
        }
    }
}
