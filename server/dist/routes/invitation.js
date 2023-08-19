"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const invitations_1 = require("../controllers/invitations");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
/* READ */
router.post("", auth_1.verifyToken, invitations_1.create);
router.post("/:id", auth_1.verifyToken, invitations_1.accept);
router.delete("/:id", auth_1.verifyToken, invitations_1.decline);
exports.default = router;
