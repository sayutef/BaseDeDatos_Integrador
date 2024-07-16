import { DeliveryRepository } from "../repositories/DeliveryRepository";
import { Delivery } from "../models/Delivery";
import { DateUtils } from "../../shared/utils/DateUtils"; 

export class DeliveryService {

    public static async getAllDelivery(): Promise<Delivery[]> {
        try {
            return await DeliveryRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error getting deliveries: ${error.message}`);
        }
    }

    public static async getDeliveryById(deliveryId: number): Promise<Delivery | null> {
        try {
            return await DeliveryRepository.findById(deliveryId);
        } catch (error: any) {
            throw new Error(`Error finding delivery: ${error.message}`);
        }
    }

    public static async addDelivery(delivery: Delivery): Promise<Delivery> {
        try {
            delivery.date = DateUtils.formatDate(new Date());
            delivery.created_at = DateUtils.formatDate(new Date()); 
            delivery.updated_at = DateUtils.formatDate(new Date()); 
            return await DeliveryRepository.createDelivery(delivery);
        } catch (error: any) {
            throw new Error(`Error creating delivery: ${error.message}`);
        }
    }

    public static async modifyDelivery(deliveryId: number, deliveryData: Delivery): Promise<Delivery | null> {
        try {
            deliveryData.updated_at = DateUtils.formatDate(new Date()); 
            return await DeliveryRepository.updateDelivery(deliveryId, deliveryData);
        } catch (error: any) {
            throw new Error(`Error updating delivery: ${error.message}`);
        }
    }

    public static async deleteDelivery(deliveryId: number): Promise<boolean> {
        try {
            return await DeliveryRepository.deleteDelivery(deliveryId);
        } catch (error: any) {
            throw new Error(`Error deleting delivery: ${error.message}`);
        }
    }

    public static async deleteDeliveryLogic(deliveryId: number): Promise<boolean> {
        try {
            return await DeliveryRepository.deleteDeliveryLogic(deliveryId);
        } catch (error: any) {
            throw new Error(`Error logically deleting delivery: ${error.message}`);
        }
    }
}
