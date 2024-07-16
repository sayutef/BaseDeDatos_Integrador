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
exports.deleteLogicalProduct = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const productService_1 = require("../services/productService");
const getAllProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productService_1.ProductService.getAllProducts();
        return res.status(200).json(products);
    }
    catch (error) {
        return res.status(500).json({ message: `Error retrieving products: ${error.message}` });
    }
});
exports.getAllProducts = getAllProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id } = req.params;
    try {
        const product = yield productService_1.ProductService.getProductById(Number(product_id));
        if (product) {
            return res.status(200).json(product);
        }
        else {
            return res.status(404).json({ message: `Product not found` });
        }
    }
    catch (error) {
        return res.status(500).json({ message: `Error finding product: ${error.message}` });
    }
});
exports.getProductById = getProductById;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productData = req.body;
    try {
        const newProduct = yield productService_1.ProductService.addProduct(productData);
        return res.status(201).json(newProduct);
    }
    catch (error) {
        return res.status(500).json({ message: `Error creating product: ${error.message}` });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id } = req.params;
    const productData = req.body;
    try {
        const updatedProduct = yield productService_1.ProductService.updateProduct(Number(product_id), productData);
        if (updatedProduct) {
            return res.status(200).json(updatedProduct);
        }
        else {
            return res.status(404).json({ message: `Product not found` });
        }
    }
    catch (error) {
        return res.status(500).json({ message: `Error modifying product: ${error.message}` });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id } = req.params;
    try {
        const result = yield productService_1.ProductService.deleteProduct(Number(product_id));
        if (result) {
            return res.status(204).json({ message: `Product deleted successfully` });
        }
        else {
            return res.status(404).json({ message: `Product not found` });
        }
    }
    catch (error) {
        return res.status(500).json({ message: `Error deleting product: ${error.message}` });
    }
});
exports.deleteProduct = deleteProduct;
const deleteLogicalProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id } = req.params;
    try {
        const result = yield productService_1.ProductService.deleteLogicalProduct(Number(product_id));
        if (result) {
            return res.status(204).json({ message: `Product logically deleted successfully` });
        }
        else {
            return res.status(404).json({ message: `Product not found` });
        }
    }
    catch (error) {
        return res.status(500).json({ message: `Error logically deleting product: ${error.message}` });
    }
});
exports.deleteLogicalProduct = deleteLogicalProduct;
