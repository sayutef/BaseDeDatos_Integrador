import { ResultSetHeader } from "mysql2";
import connection from "../../shared/config/database";
import { Delivery } from "../models/Delivery";

export class DeliveryRepository {

    public static async findAll(): Promise<Delivery[]> {
        const query = "SELECT * FROM delivery";
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const deliveries: Delivery[] = results as Delivery[];
                    resolve(deliveries);
                }
            });
        });
    }

    public static async findById(delivery_id: number): Promise<Delivery | null> {
        const query = "SELECT * FROM delivery WHERE delivery_id = ?";
        return new Promise((resolve, reject) => {
            connection.query(query, [delivery_id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const deliveries: Delivery[] = results as Delivery[];
                    if (deliveries.length > 0) {
                        resolve(deliveries[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createDelivery(delivery: Delivery): Promise<Delivery> {
        const { created_at, status_id_fk, event_id_fk, date, created_by, updated_at, updated_by, deleted } = delivery;
        const query = `INSERT INTO delivery (created_at, status_id_fk, event_id_fk, date, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [created_at, status_id_fk, event_id_fk, date, created_by, updated_at, updated_by, deleted ? 1 : 0];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const createdDeliveryId = (result as ResultSetHeader).insertId;
                    const createdDelivery: Delivery = { ...delivery, delivery_id: createdDeliveryId };
                    resolve(createdDelivery);
                }
            });
        });
    }

    public static async updateDelivery(deliveryId: number, deliveryData: Delivery): Promise<Delivery | null> {
        const { status_id_fk, event_id_fk, updated_at, updated_by, deleted } = deliveryData;
        const query = `UPDATE delivery SET status_id_fk = ?, event_id_fk = ?, updated_by = ?, updated_at = ?, deleted = ? WHERE delivery_id = ?`;
        const values = [status_id_fk, event_id_fk, updated_by, updated_at, deleted ? 1 : 0, deliveryId];
        
        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as ResultSetHeader).affectedRows > 0) {
                        resolve({ ...deliveryData, delivery_id: deliveryId });
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async deleteDelivery(delivery_id: number): Promise<boolean> {
        const query = 'DELETE FROM delivery WHERE delivery_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [delivery_id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as ResultSetHeader).affectedRows > 0) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            });
        });
    }

    public static async deleteDeliveryLogic(delivery_id: number): Promise<boolean> {
        const query = 'UPDATE delivery SET deleted = 1 WHERE delivery_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [delivery_id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as ResultSetHeader).affectedRows > 0) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            });
        });
    }
}
