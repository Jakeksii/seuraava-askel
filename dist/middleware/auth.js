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
exports.verifyToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const UserConnection_js_1 = require("../connections/UserConnection.js");
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let token = req.header("Authorization");
        if (!token)
            return res.status(401).send({ message: "Access Denied: No authorization token" });
        try {
            const secret = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "";
            const verified = (0, jsonwebtoken_1.verify)(token, secret);
            //Test if user can be found with _id that was provided by token
            const user = yield UserConnection_js_1.User.findById(verified);
            if (!user)
                return res.status(401).send({ message: "Access Denied: Bad authorization token" });
            req.user = user;
            return next();
        }
        catch (error) {
            return res.status(401).send({ message: "Access Denied: Bad authorization token" });
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.verifyToken = verifyToken;
