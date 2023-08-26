"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const email_1 = require("../controllers/email");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
/* READ */
router.post("/verification", auth_1.verifyToken, email_1.sendVerificationEmail);
router.post("/verify/:_id", email_1.verifyEmail);
exports.default = router;
