"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deliveryController_1 = require("../controllers/deliveryController");
const auth_1 = require("../../shared/middlewares/auth");
const deliveryRoutes = (0, express_1.Router)();
deliveryRoutes.get('/', auth_1.authMiddleware, deliveryController_1.getAllDelivery);
deliveryRoutes.get('/:delivery_id', auth_1.authMiddleware, deliveryController_1.getDeliveryById);
deliveryRoutes.post('/', auth_1.authMiddleware, deliveryController_1.createDelivery);
deliveryRoutes.put('/:delivery_id', auth_1.authMiddleware, deliveryController_1.updateDelivery);
deliveryRoutes.delete('/:delivery_id', auth_1.authMiddleware, deliveryController_1.deleteDelivery);
deliveryRoutes.put('/deleted/:delivery_id', auth_1.authMiddleware, deliveryController_1.deleteLogicalDelivery);
exports.default = deliveryRoutes;