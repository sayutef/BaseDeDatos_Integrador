import { DeliveryRepository } from "../repositories/DeliveryRepository";
import { Delivery } from "../models/Delivery";
import { DateUtils } from "../../shared/utils/DateUtils"; 

export class deliveryService {

    public static async getAllDelivery(): Promise<Delivery[]> {
        try {
            return await DeliveryRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener deliveries: ${error.message}`);
        }
    }

    public static async getDeliveryById(deliveryId: number): Promise<Delivery | null> {
        try {
            return await DeliveryRepository.findById(deliveryId);
        } catch (error: any) {
            throw new Error(`Error al encontrar delivery: ${error.message}`);
        }
    }

    public static async addDelivery(delivery: Delivery): Promise<Delivery> {
        try {
            delivery.date = DateUtils.formatDate(new Date());
            delivery.created_at = DateUtils.formatDate(new Date()); 
            delivery.updated_at = DateUtils.formatDate(new Date()); 
            return await DeliveryRepository.createDelivery(delivery);
        } catch (error: any) {
            throw new Error(`Error al crear delivery: ${error.message}`);
        }
    }

    public static async modifyDelivery(deliveryId: number, deliveryData: Partial<Delivery>): Promise<Delivery | null> {
        try {
            const deliveryFound = await DeliveryRepository.findById(deliveryId);
            
            if (!deliveryFound) {
                throw new Error(`No se encontró el delivery con ID ${deliveryId}`);
            }
            
            if (deliveryData.status_id_fk !== undefined) {
                deliveryFound.status_id_fk = deliveryData.status_id_fk;
            }
            if (deliveryData.purchaseOrder_id_fk !== undefined) {
                deliveryFound.purchaseOrder_id_fk = deliveryData.purchaseOrder_id_fk;
            }
            if (deliveryData.updated_by !== undefined) {
                deliveryFound.updated_by = deliveryData.updated_by;
            }
            if (deliveryData.deleted !== undefined) {
                deliveryFound.deleted = deliveryData.deleted;
            }

            deliveryFound.updated_at = DateUtils.formatDate(new Date());

            const updatedDelivery = await DeliveryRepository.updateDelivery(deliveryId, deliveryFound);

            if (!updatedDelivery) {
                throw new Error(`No se pudo actualizar el delivery con ID ${deliveryId}`);
            }

            return updatedDelivery;
        } catch (error: any) {
            throw new Error(`Error al modificar el delivery: ${error.message}`);
        }
    }

    public static async deleteDelivery(deliveryId: number): Promise<boolean> {
        try {
            return await DeliveryRepository.deleteDelivery(deliveryId);
        } catch (error: any) {
            throw new Error(`Error al eliminar delivery: ${error.message}`);
        }
    }

    public static async deleteDeliveryLogic(deliveryId: number): Promise<boolean> {
        try {
            return await DeliveryRepository.deleteDeliveryLogic(deliveryId);
        } catch (error: any) {
            throw new Error(`Error al eliminar lógicamente el delivery: ${error.message}`);
        }
    }
}
