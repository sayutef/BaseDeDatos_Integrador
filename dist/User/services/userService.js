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
exports.UserService = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
const DateUtils_1 = require("../../shared/utils/DateUtils");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretKey = process.env.SECRET || '';
const saltRounds = 10;
class UserService {
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.getUserByEmail(email);
                if (!user) {
                    return null;
                }
                const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
                if (!passwordMatch) {
                    return null;
                }
                const payload = {
                    user_id: user.user_id,
                    role_id_fk: user.role_id_fk,
                    first_name: user.first_name,
                    email: user.email,
                };
                return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '24h' });
            }
            catch (error) {
                throw new Error(`Error al iniciar sesión: ${error.message}`);
            }
        });
    }
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UserRepository_1.UserRepository.findAll();
            }
            catch (error) {
                throw new Error(`Error al obtener usuarios: ${error.message}`);
            }
        });
    }
    static getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UserRepository_1.UserRepository.findById(userId);
            }
            catch (error) {
                throw new Error(`Error al encontrar usuario: ${error.message}`);
            }
        });
    }
    static getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UserRepository_1.UserRepository.findByEmail(email);
            }
            catch (error) {
                throw new Error(`Error al encontrar usuario: ${error.message}`);
            }
        });
    }
    static addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield bcrypt_1.default.genSalt(saltRounds);
                user.created_at = DateUtils_1.DateUtils.formatDate(new Date());
                user.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                user.password = yield bcrypt_1.default.hash(user.password, salt);
                return yield UserRepository_1.UserRepository.createUser(user);
            }
            catch (error) {
                throw new Error(`Error al crear usuario: ${error.message}`);
            }
        });
    }
    static modifyUser(userId, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userFound = yield UserRepository_1.UserRepository.findById(userId);
                const salt = yield bcrypt_1.default.genSalt(saltRounds);
                if (userFound) {
                    if (userData.first_name) {
                        userFound.first_name = userData.first_name;
                    }
                    if (userData.last_name) {
                        userFound.last_name = userData.last_name;
                    }
                    if (userData.email) {
                        userFound.email = userData.email;
                    }
                    if (userData.password) {
                        userFound.password = yield bcrypt_1.default.hash(userData.password, salt);
                    }
                    if (userData.role_id_fk) {
                        userFound.role_id_fk = userData.role_id_fk;
                    }
                    if (userData.updated_by) {
                        userFound.updated_by = userData.updated_by;
                    }
                    if (userData.deleted !== undefined) {
                        userFound.deleted = userData.deleted;
                    }
                }
                else {
                    return null;
                }
                userFound.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                return yield UserRepository_1.UserRepository.updateUser(userId, userFound);
            }
            catch (error) {
                throw new Error(`Error al modificar usuario: ${error.message}`);
            }
        });
    }
    static deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UserRepository_1.UserRepository.deleteUser(userId);
            }
            catch (error) {
                throw new Error(`Error al eliminar usuario: ${error.message}`);
            }
        });
    }
    static deleteUserLogic(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UserRepository_1.UserRepository.deleteLogic(userId);
            }
            catch (error) {
                throw new Error(`Error al eliminar usuario lógicamente: ${error.message}`);
            }
        });
    }
    static userExists(identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isNaN(parseInt(identifier))) {
                // Verificar por ID
                const userId = parseInt(identifier, 10);
                const userById = yield UserRepository_1.UserRepository.findById(userId);
                return !!userById; // Devuelve true si se encontró un usuario con ese ID
            }
            else {
                // Verificar por correo electrónico
                const userByEmail = yield UserRepository_1.UserRepository.findByEmail(identifier);
                return !!userByEmail; // Devuelve true si se encontró un usuario con ese correo electrónico
            }
        });
    }
}
exports.UserService = UserService;
