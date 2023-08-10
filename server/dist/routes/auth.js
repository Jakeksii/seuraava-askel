"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_js_1 = require("../controllers/auth.js");
const auth_js_2 = require("../middleware/auth.js");
const router = (0, express_1.Router)();
/* READ */
router.post("/register", auth_js_1.register);
router.post("/login", auth_js_1.login);
router.get("/token", auth_js_2.verifyToken, auth_js_1.refreshToken);
exports.default = router;
