import { ResultSetHeader } from "mysql2";
import connection from "../../shared/config/database";
import { PurchaseOrder } from "../models/PurchaseOrder";

export class PurchaseOrderRepository {

    public static async findAll(): Promise<PurchaseOrder[]> {
        const query = "SELECT * FROM purchaseorder";
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const purchaseOrders: PurchaseOrder[] = results as PurchaseOrder[];
                    resolve(purchaseOrders);
                }
            });
        });
    }

    public static async findById(purchaseOrder_id: number): Promise<PurchaseOrder | null> {
        const query = "SELECT * FROM purchaseorder WHERE purchaseOrder_id = ?";
        return new Promise((resolve, reject) => {
            connection.query(query, [purchaseOrder_id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const purchaseOrders: PurchaseOrder[] = results as PurchaseOrder[];
                    if (purchaseOrders.length > 0) {
                        resolve(purchaseOrders[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }
    public static async createPurchaseOrder(purchaseOrder: PurchaseOrder): Promise<PurchaseOrder> {
        const query = `INSERT INTO purchaseorder (date, total, client_id_fk, shippingAddress, orderStatus, created_at, created_by, updated_at, updated_by, deleted)  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            connection.query(query, [ purchaseOrder.date,purchaseOrder.total,purchaseOrder.client_id_fk,purchaseOrder.shippingAddress,purchaseOrder.orderStatus,purchaseOrder.created_at,purchaseOrder.created_by,purchaseOrder.updated_at,purchaseOrder.updated_by,purchaseOrder.deleted] , (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const createPurchaseOrderId = (result as ResultSetHeader).insertId;
                    const createdPurchaseOrder: PurchaseOrder = { ...purchaseOrder, purchaseOrder_id: createPurchaseOrderId };
                    resolve(createdPurchaseOrder);
                }
            });
        });
    }
    

    public static async updatePurchaseOrder(purchaseOrder_id: number, purchaseOrderData: PurchaseOrder): Promise<PurchaseOrder | null> {
        const query = 'UPDATE purchaseorder SET date = ?, total = ?, client_id_fk = ?, shippingAddress = ?, orderStatus = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE purchaseOrder_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [purchaseOrderData.date, purchaseOrderData.total, purchaseOrderData.client_id_fk, purchaseOrderData.shippingAddress, purchaseOrderData.orderStatus, purchaseOrderData.updated_at, purchaseOrderData.updated_by, purchaseOrderData.deleted, purchaseOrder_id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if ((result as ResultSetHeader).affectedRows > 0) {
                        const updatedPurchaseOrder: PurchaseOrder = { ...purchaseOrderData, purchaseOrder_id: purchaseOrder_id };
                        resolve(updatedPurchaseOrder);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    public static async deletePurchaseOrder(purchaseOrder_id: number): Promise<boolean> {
        const query = 'DELETE FROM purchaseorder WHERE purchaseOrder_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [purchaseOrder_id], (error, result) => {
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
    public static async deletePurchaseLogic(role_id: number): Promise<boolean> {
        const query = 'UPDATE purchaseorder SET deleted = 1 WHERE role_id = ?';
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


