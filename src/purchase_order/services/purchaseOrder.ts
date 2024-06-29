import { PurchaseOrderRepository } from "../repositories/PurchaseOrderRepository";
import { PurchaseOrder } from "../models/PurchaseOrder";
import { DateUtils } from "../../shared/utils/DateUtils";

export class purchaseOrderService {

    public static async getAllPurchaseOrder(): Promise<PurchaseOrder[]> {
        try {
            return await PurchaseOrderRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener el recibp ${error.message}`);
        }
    }

    public static async getPurchaseOrderById(PurchaseOrderId: number): Promise<PurchaseOrder | null> {
        try {
            return await PurchaseOrderRepository.findById(PurchaseOrderId);
        } catch (error: any) {
            throw new Error(`Error al encontrar el recibo: ${error.message}`);
        }
    }

    public static async addPurchaseOrder(purchaseOrder: PurchaseOrder) {
        try {
            const currentDate = new Date();
            purchaseOrder.date = DateUtils.formatDate(currentDate);
            purchaseOrder.created_at = DateUtils.formatDate(currentDate);
            purchaseOrder.updated_at = DateUtils.formatDate(currentDate);

            return await PurchaseOrderRepository.createPurchaseOrder(purchaseOrder);
        } catch (error: any) {
            throw new Error(`Error al crear orden de compra: ${error.message}`);
        }
    }

    public static async modifyPurchaseOrder(purchaseOrderId: number, purchaseOrderData: PurchaseOrder): Promise<PurchaseOrder | null> {
        try {
            const purchaseOrderFinded = await PurchaseOrderRepository.findById(purchaseOrderId);
            
            if (purchaseOrderFinded) {
                if (purchaseOrderData.date) {
                    purchaseOrderFinded.date = purchaseOrderData.date;
                }
                if (purchaseOrderData.total) {
                    purchaseOrderFinded.total = purchaseOrderData.total;
                }
                if (purchaseOrderData.client_id_fk) {
                    purchaseOrderFinded.client_id_fk = purchaseOrderData.client_id_fk;
                }
                if (purchaseOrderData.shippingAddress) {
                    purchaseOrderFinded.shippingAddress = purchaseOrderData.shippingAddress;
                }
                if (purchaseOrderData.orderStatus) {
                    purchaseOrderFinded.orderStatus = purchaseOrderData.orderStatus;
                }
                if(purchaseOrderData.updated_by){
                    purchaseOrderFinded.updated_by = purchaseOrderData.updated_by;
                }
                if (purchaseOrderData.deleted !== undefined) {
                    purchaseOrderFinded.deleted = purchaseOrderData.deleted;
                }
                purchaseOrderFinded.updated_at = DateUtils.formatDate(new Date());
                
                const updatedPurchaseOrder = await PurchaseOrderRepository.updatePurchaseOrder(purchaseOrderId, purchaseOrderFinded);
                return updatedPurchaseOrder;
            } else {
                return null; 
            }
        } catch (error: any) {
            throw new Error(`Error al modificar orden de compra: ${error.message}`);
        }
    }
    
    public static async deletedPurchaseOrder(purchaseOrderId: number): Promise<boolean> {
        try {
            return await PurchaseOrderRepository.deletePurchaseOrder(purchaseOrderId);
        } catch (error: any) {
            throw new Error(`Error al eliminar usuario: ${error.message}`);
        }
    }
}
