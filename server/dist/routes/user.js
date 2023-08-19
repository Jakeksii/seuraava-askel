"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
/* READ */
router.get("", auth_1.verifyToken, user_1.getCurrentUser);
router.delete("", auth_1.verifyToken, user_1.deleteUser);
exports.default = router;
