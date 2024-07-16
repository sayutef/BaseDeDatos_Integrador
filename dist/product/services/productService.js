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
exports.ProductService = void 0;
const ProductRepository_1 = require("../repositories/ProductRepository");
const DateUtils_1 = require("../../shared/utils/DateUtils");
class ProductService {
    static getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ProductRepository_1.ProductRepository.findAll();
            }
            catch (error) {
                throw new Error(`Error retrieving products: ${error.message}`);
            }
        });
    }
    static getProductById(product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ProductRepository_1.ProductRepository.findById(product_id);
            }
            catch (error) {
                throw new Error(`Error finding product: ${error.message}`);
            }
        });
    }
    static addProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                product.created_at = DateUtils_1.DateUtils.formatDate(new Date());
                product.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                return yield ProductRepository_1.ProductRepository.createUser(product);
            }
            catch (error) {
                throw new Error(`Error creating product: ${error.message}`);
            }
        });
    }
    static updateProduct(product_id, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productFound = yield ProductRepository_1.ProductRepository.findById(product_id);
                if (!productFound) {
                    throw new Error(`Product with ID ${product_id} not found.`);
                }
                if (productData.name !== undefined) {
                    productFound.name = productData.name;
                }
                if (productData.description !== undefined) {
                    productFound.description = productData.description;
                }
                if (productData.price !== undefined) {
                    productFound.price = productData.price;
                }
                if (productData.stock !== undefined) {
                    productFound.stock = productData.stock;
                }
                if (productData.category_id_fk !== undefined) {
                    productFound.category_id_fk = productData.category_id_fk;
                }
                if (productData.updated_by !== undefined) {
                    productFound.updated_by = productData.updated_by;
                }
                if (productData.updated_at !== undefined) {
                    productFound.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                }
                if (productData.deleted !== undefined) {
                    productFound.deleted = productData.deleted;
                }
                return yield ProductRepository_1.ProductRepository.updateProduct(product_id, productFound);
            }
            catch (error) {
                throw new Error(`Error modifying product: ${error.message}`);
            }
        });
    }
    static deleteProduct(product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ProductRepository_1.ProductRepository.deleteUser(product_id);
            }
            catch (error) {
                throw new Error(`Error deleting product: ${error.message}`);
            }
        });
    }
    static deleteLogicalProduct(product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ProductRepository_1.ProductRepository.deleteProductLogic(product_id);
            }
            catch (error) {
                throw new Error(`Error logically deleting product: ${error.message}`);
            }
        });
    }
}
exports.ProductService = ProductService;
