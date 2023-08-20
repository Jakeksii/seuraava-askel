"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const auth_2 = require("../middleware/auth");
const router = (0, express_1.Router)();
/* READ */
router.post("/register", auth_1.register);
router.post("/login", auth_1.login);
router.get("/token", auth_2.verifyToken, auth_1.refreshToken);
exports.default = router;
