"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryRepository = void 0;
const database_1 = __importDefault(require("../../shared/config/database"));
class DeliveryRepository {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM delivery";
            return new Promise((resolve, reject) => {
                database_1.default.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const deliveries = results;
                        resolve(deliveries);
                    }
                });
            });
        });
    }
    static findById(delivery_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM delivery WHERE delivery_id = ?";
            return new Promise((resolve, reject) => {
                database_1.default.query(query, [delivery_id], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const deliveries = results;
                        if (deliveries.length > 0) {
                            resolve(deliveries[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static createDelivery(delivery) {
        return __awaiter(this, void 0, void 0, function* () {
            const { purchaseOrder_id_fk, created_at, status_id_fk, date, created_by, updated_at, updated_by, deleted } = delivery;
            const query = `INSERT INTO delivery (purchaseOrder_id_fk, created_at, status_id_fk, date, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            const values = [purchaseOrder_id_fk, created_at, status_id_fk, date, created_by, updated_at, updated_by, deleted ? 1 : 0];
            return new Promise((resolve, reject) => {
                database_1.default.query(query, values, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const createDeliveryId = result.insertId;
                        const createdDelivery = Object.assign(Object.assign({}, delivery), { delivery_id: createDeliveryId });
                        resolve(createdDelivery);
                    }
                });
            });
        });
    }
    static updateDelivery(deliveryId, deliveryData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { purchaseOrder_id_fk, status_id_fk, updated_at, updated_by, deleted } = deliveryData;
            const query = `UPDATE delivery SET purchaseOrder_id_fk = ?, status_id_fk = ?, updated_by = ?, updated_at = ?, deleted = ? WHERE delivery_id = ?`;
            const values = [purchaseOrder_id_fk, status_id_fk, updated_by, updated_at, deleted ? 1 : 0, deliveryId];
            return new Promise((resolve, reject) => {
                database_1.default.query(query, values, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            resolve(Object.assign(Object.assign({}, deliveryData), { delivery_id: deliveryId }));
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static deleteDelivery(delivery_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM delivery WHERE delivery_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.query(query, [delivery_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            resolve(true);
                        }
                        else {
                            resolve(false);
                        }
                    }
                });
            });
        });
    }
    static deleteDeliveryLogic(delivery_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE delivery SET deleted = 1 WHERE delivery_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.query(query, [delivery_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            resolve(true);
                        }
                        else {
                            resolve(false);
                        }
                    }
                });
            });
        });
    }
}
exports.DeliveryRepository = DeliveryRepository;
