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
exports.userExists = exports.deleteLogicalUser = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = exports.loginUser = void 0;
const userService_1 = require("../services/userService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.SECRET || '';
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const token = yield userService_1.UserService.login(email, password);
        if (!token) {
            res.status(401).json({ message: 'Invalid email or password' });
        }
        else {
            const payload = jsonwebtoken_1.default.verify(token, secretKey);
            res.status(200).json({ token, user_id: payload.user_id });
        }
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.loginUser = loginUser;
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService_1.UserService.getAllUsers();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.user_id, 10);
    try {
        const user = yield userService_1.UserService.getUserById(userId);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const exists = yield userService_1.UserService.userExists(email);
        if (exists) {
            res.status(409).json({ message: 'User already exists' });
            return;
        }
        const newUser = yield userService_1.UserService.addUser(req.body);
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.user_id, 10);
    try {
        const updatedUser = yield userService_1.UserService.modifyUser(userId, req.body);
        if (updatedUser) {
            res.status(200).json(updatedUser);
        }
        else {
            res.status(404).json({ message: 'User not found or could not be updated' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.user_id, 10);
    try {
        const deleted = yield userService_1.UserService.deleteUser(userId);
        if (deleted) {
            res.status(200).json({ message: 'User deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'User not found or could not be deleted' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteUser = deleteUser;
const deleteLogicalUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.user_id, 10);
    try {
        const success = yield userService_1.UserService.deleteUserLogic(userId);
        if (success) {
            res.status(200).json({ message: 'User logically deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'User not found or already logically deleted' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteLogicalUser = deleteLogicalUser;
const userExists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { identifier } = req.params;
    try {
        const exists = yield userService_1.UserService.userExists(identifier);
        res.json({ exists });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.userExists = userExists;
