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
exports.refreshToken = exports.login = exports.register = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const UserConnection_js_1 = require("../connections/UserConnection.js");
/* REGISTER USER */
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, email, password } = req.body;
        //salt and hash
        const salt = yield (0, bcrypt_1.genSalt)();
        const passwordHash = yield (0, bcrypt_1.hash)(password, salt);
        const newUser = new UserConnection_js_1.User({
            first_name,
            last_name,
            email,
            password: passwordHash,
        });
        const validationError = newUser.validateSync();
        if (validationError)
            return res.status(400).json({ message: validationError.message });
        if (yield UserConnection_js_1.User.findOne({ email: email }))
            return res.status(409).json({ message: "Email already in use" });
        yield newUser.save();
        return res.status(201).end();
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.register = register;
/* LOGGING IN Gives user jwt token that expires in 10 minutes*/
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        //Check if credintials are valid and user exist
        const { email, password } = req.body;
        var user = yield UserConnection_js_1.User.findOne({ email: email });
        if (!user)
            return res.status(400).json({ message: "Invalid credentials" });
        const isMatch = yield (0, bcrypt_1.compare)(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });
        //Create token
        const secret = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "";
        const token = (0, jsonwebtoken_1.sign)({ _id: user._id }, secret, { expiresIn: '1d' });
        //Send token and user info to front
        var user = Object.assign({}, user._doc);
        delete user.password;
        return res.status(200).json({ token: token, user: user });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.login = login;
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const secret = (_b = process.env.JWT_SECRET) !== null && _b !== void 0 ? _b : "";
        const token = (0, jsonwebtoken_1.sign)({ _id: req.user._id }, secret, { expiresIn: '1d' });
        return res.status(200).json({ token: token });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.refreshToken = refreshToken;
