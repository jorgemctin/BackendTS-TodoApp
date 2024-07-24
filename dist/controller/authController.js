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
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const useful_1 = require("../service/useful");
const JWT_SECRET = process.env.JWT_SECRET || "";
// REGISTER 
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username } = req.body;
        // Validations
        if (!(yield (0, useful_1.isValidField)(email, useful_1.validateEmail, "Invalid email format", res)))
            return;
        if (!(yield (0, useful_1.isValidField)(username, useful_1.isValidUsername, "Username must be a maximum of 12 characters", res)))
            return;
        if (!(yield (0, useful_1.isValidField)(password, (pw) => pw.length >= 6, "Password must be longer than 6 characters", res)))
            return;
        if (!(yield (0, useful_1.isValidField)(email, useful_1.userFoundByEmail, "A user is already registered with that email address.", res)))
            return;
        if (!(yield (0, useful_1.isValidField)(username, useful_1.userFoundByUsername, "The username is already in use.", res)))
            return;
        const encryptedPassword = yield bcrypt_1.default.hash(password, 10);
        const userRegistered = yield User_1.User.create(Object.assign(Object.assign({}, req.body), { role: "user", password: encryptedPassword })).save();
        const token = jsonwebtoken_1.default.sign({
            userId: userRegistered.id
        }, JWT_SECRET, {
            expiresIn: "3h",
        });
        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            userRegistered: {
                username: userRegistered.username,
                email: userRegistered.email,
                userId: userRegistered.id,
                role: userRegistered.role,
            },
            token,
        });
    }
    catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "User cant be created",
            error: error.message,
        });
    }
});
exports.register = register;
//LOGIN
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        //Validations
        if (!(0, useful_1.checkLoginData)(email, password, res))
            return;
        yield (0, useful_1.isValidField)(email, useful_1.userExistsByEmail, "Invalid email");
        const user = yield User_1.User.findOne({ where: { email } });
        if (!user || !(yield (0, useful_1.validatePassword)(password, user.password, res)))
            return;
        const token = jsonwebtoken_1.default.sign({
            userId: user.id
        }, JWT_SECRET, {
            expiresIn: "3h",
        });
        return res.status(200).json({
            success: true,
            message: "User logged succesfully",
            data: { user, token },
        });
    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "users cant be logged",
            error: error.message,
        });
    }
});
exports.login = login;
//# sourceMappingURL=authController.js.map