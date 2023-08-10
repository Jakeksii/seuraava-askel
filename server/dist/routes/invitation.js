"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const invitations_js_1 = require("../controllers/invitations.js");
const auth_js_1 = require("../middleware/auth.js");
const router = (0, express_1.Router)();
/* READ */
router.post("", auth_js_1.verifyToken, invitations_js_1.create);
router.post("/:id", auth_js_1.verifyToken, invitations_js_1.accept);
router.delete("/:id", auth_js_1.verifyToken, invitations_js_1.decline);
exports.default = router;
