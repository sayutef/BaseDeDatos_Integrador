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
exports.deleteLogicalDelivery = exports.deleteDelivery = exports.updateDelivery = exports.createDelivery = exports.getDeliveryById = exports.getAllDelivery = void 0;
const deliveryService_1 = require("../services/deliveryService");
const getAllDelivery = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const delivery = yield deliveryService_1.deliveryService.getAllDelivery();
        res.status(200).json(delivery);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllDelivery = getAllDelivery;
const getDeliveryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deliveryId = parseInt(req.params.delivery_id, 10);
        const delivery = yield deliveryService_1.deliveryService.getDeliveryById(deliveryId);
        if (delivery) {
            res.status(200).json(delivery);
        }
        else {
            res.status(404).json({ message: 'Delivery no encontrado.' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getDeliveryById = getDeliveryById;
const createDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newDelivery = yield deliveryService_1.deliveryService.addDelivery(req.body);
        res.status(201).json(newDelivery);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createDelivery = createDelivery;
const updateDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deliveryId = parseInt(req.params.delivery_id, 10);
        const updatedDelivery = yield deliveryService_1.deliveryService.modifyDelivery(deliveryId, req.body);
        if (updatedDelivery) {
            res.status(200).json(updatedDelivery);
        }
        else {
            res.status(404).json({ message: 'Delivery no encontrado o no se pudo actualizar.' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateDelivery = updateDelivery;
const deleteDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deliveryId = parseInt(req.params.delivery_id, 10);
        const deleted = yield deliveryService_1.deliveryService.deleteDelivery(deliveryId);
        if (deleted) {
            res.status(200).json({ message: 'Delivery eliminado correctamente.' });
        }
        else {
            res.status(404).json({ message: 'Delivery no encontrado o no se pudo eliminar.' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteDelivery = deleteDelivery;
const deleteLogicalDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deliveryId = parseInt(req.params.delivery_id, 10);
        const success = yield deliveryService_1.deliveryService.deleteDeliveryLogic(deliveryId);
        if (success) {
            res.status(200).json({ message: 'Delivery eliminado lógicamente correctamente.' });
        }
        else {
            res.status(404).json({ message: 'Delivery no encontrado o ya eliminado lógicamente.' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteLogicalDelivery = deleteLogicalDelivery;
