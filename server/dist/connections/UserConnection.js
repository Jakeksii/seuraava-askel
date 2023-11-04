"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailVerification = exports.User = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const EmailVerification_1 = __importDefault(require("../schemas/EmailVerification"));
const User_1 = __importDefault(require("../schemas/User"));
dotenv_1.default.config();
const url = (_a = process.env.MONGO_URL_USER) !== null && _a !== void 0 ? _a : "";
const UserConn = mongoose_1.default.createConnection(url);
UserConn.model("User", User_1.default);
UserConn.model("EmailVerification", EmailVerification_1.default);
exports.User = UserConn.models.User;
exports.EmailVerification = UserConn.models.EmailVerification;
exports.default = UserConn;