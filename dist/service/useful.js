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
exports.isValidTodoText = exports.userExistsByEmail = exports.validatePassword = exports.checkLoginData = exports.userFoundByUsername = exports.userFoundByEmail = exports.isValidUsername = exports.validateEmail = exports.isValidField = void 0;
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
// Validations
const isValidField = (field, validator, errorMessage, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isValid = yield validator(field);
    if (!isValid) {
        if (res && !res.headersSent) {
            res.status(400).json({
                success: false,
                message: errorMessage,
            });
        }
        return false;
    }
    return true;
});
exports.isValidField = isValidField;
//REGISTER
//Email
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
exports.validateEmail = validateEmail;
//Username
const isValidUsername = (username) => /^[a-zA-Z0-9._-]{1,12}$/.test(username);
exports.isValidUsername = isValidUsername;
//Check email repeat
const userFoundByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () { return !(yield User_1.User.findOne({ where: { email } })); });
exports.userFoundByEmail = userFoundByEmail;
//Check username repeat
const userFoundByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () { return !(yield User_1.User.findOne({ where: { username: username } })); });
exports.userFoundByUsername = userFoundByUsername;
//LOGIN
// Verifica si los datos requeridos están completos
const checkLoginData = (email, password, res) => {
    if (!email || !password) {
        res.status(400).json({
            success: false,
            message: "Incomplete login data",
        });
        return false;
    }
    return true;
};
exports.checkLoginData = checkLoginData;
// Check password correctness
const validatePassword = (password, hash, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isValid = yield bcrypt_1.default.compare(password, hash);
    if (!isValid) {
        res.status(401).json({
            success: false,
            message: "Invalid password",
        });
        return false;
    }
    return true;
});
exports.validatePassword = validatePassword;
// Check if user exists by email
const userExistsByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () { return !!(yield User_1.User.findOne({ where: { email } })); });
exports.userExistsByEmail = userExistsByEmail;
//TODO
//Todo text
const isValidTodoText = (text) => /^[a-zA-Z0-9._\-?!¡¿ ]{1,200}$/.test(text);
exports.isValidTodoText = isValidTodoText;
//# sourceMappingURL=useful.js.map