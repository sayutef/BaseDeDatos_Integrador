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
                    const users: Delivery[] = results as Delivery[];
                    resolve(users);
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
                    const users: Delivery[] = results as Delivery[];
                    if (users.length > 0) {
                        resolve(users[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async createDelivery(delivery: Delivery): Promise<Delivery> {
        const { purchaseOrder_id_fk, created_at, status, date, created_by, updated_at, updated_by, deleted } = delivery;
        const query = `INSERT INTO Delivery (purchaseOrder_id_fk, created_at, status, date, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [purchaseOrder_id_fk, created_at, status, date, created_by, updated_at, updated_by, deleted ? 1 : 0];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const createDeliveryId = (result as any).insertId;
                    const createdDelivery: Delivery = { ...delivery, delivery_id: createDeliveryId };
                    resolve(createdDelivery);
                }
            });
        });
    }
    
    public static async updateDelivery(deliveryId: number, deliveryData: Delivery): Promise<Delivery | null> {
        const { purchaseOrder_id_fk, status, updated_at, updated_by, deleted } = deliveryData;
        const query = `UPDATE delivery SET purchaseOrder_id_fk = ?, status = ?, updated_by = ?, updated_at= ?, deleted = ? WHERE delivery_id = ?`;
        const values =  [purchaseOrder_id_fk, status, updated_by,updated_at, deleted ? 1 : 0, deliveryId];
        return new Promise((resolve, reject) => {
            connection.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as any).affectedRows > 0) {
                        resolve({ ...deliveryData, delivery_id: deliveryId });
                    } else {
                        resolve(null); 
                    }
                }
            });
        });
    }

    public static async deleteDelivery(user_id: number): Promise<boolean> {
        const query = 'DELETE FROM delivery WHERE delivery_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [user_id], (error, result) => {
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
    public static async deleteDeliveryLogic(role_id: number): Promise<boolean> {
        const query = 'UPDATE delivery SET deleted = 1 WHERE role_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [role_id], (error, result) => {
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


