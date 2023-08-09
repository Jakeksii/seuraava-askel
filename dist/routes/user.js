"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_js_1 = require("../controllers/user.js");
const auth_js_1 = require("../middleware/auth.js");
const router = (0, express_1.Router)();
/* READ */
router.get("", auth_js_1.verifyToken, user_js_1.getCurrentUser);
router.delete("", auth_js_1.verifyToken, user_js_1.deleteUser);
exports.default = router;
