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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deliveryService = void 0;
const DeliveryRepository_1 = require("../repositories/DeliveryRepository");
const DateUtils_1 = require("../../shared/utils/DateUtils");
class deliveryService {
    static getAllDelivery() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield DeliveryRepository_1.DeliveryRepository.findAll();
            }
            catch (error) {
                throw new Error(`Error al obtener deliveries: ${error.message}`);
            }
        });
    }
    static getDeliveryById(deliveryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield DeliveryRepository_1.DeliveryRepository.findById(deliveryId);
            }
            catch (error) {
                throw new Error(`Error al encontrar delivery: ${error.message}`);
            }
        });
    }
    static addDelivery(delivery) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                delivery.date = DateUtils_1.DateUtils.formatDate(new Date());
                delivery.created_at = DateUtils_1.DateUtils.formatDate(new Date());
                delivery.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                return yield DeliveryRepository_1.DeliveryRepository.createDelivery(delivery);
            }
            catch (error) {
                throw new Error(`Error al crear delivery: ${error.message}`);
            }
        });
    }
    static modifyDelivery(deliveryId, deliveryData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deliveryFound = yield DeliveryRepository_1.DeliveryRepository.findById(deliveryId);
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
                deliveryFound.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                const updatedDelivery = yield DeliveryRepository_1.DeliveryRepository.updateDelivery(deliveryId, deliveryFound);
                if (!updatedDelivery) {
                    throw new Error(`No se pudo actualizar el delivery con ID ${deliveryId}`);
                }
                return updatedDelivery;
            }
            catch (error) {
                throw new Error(`Error al modificar el delivery: ${error.message}`);
            }
        });
    }
    static deleteDelivery(deliveryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield DeliveryRepository_1.DeliveryRepository.deleteDelivery(deliveryId);
            }
            catch (error) {
                throw new Error(`Error al eliminar delivery: ${error.message}`);
            }
        });
    }
    static deleteDeliveryLogic(deliveryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield DeliveryRepository_1.DeliveryRepository.deleteDeliveryLogic(deliveryId);
            }
            catch (error) {
                throw new Error(`Error al eliminar lógicamente el delivery: ${error.message}`);
            }
        });
    }
}
exports.deliveryService = deliveryService;
