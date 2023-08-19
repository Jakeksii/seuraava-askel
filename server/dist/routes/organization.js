"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const organization_1 = require("../controllers/organization");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
/* READ */
router.post("", auth_1.verifyToken, organization_1.createOrganization);
router.get("/:id", organization_1.getOrganization);
router.get("/:id/detailed", auth_1.verifyToken, organization_1.getDetailedOrganization);
router.delete("/:id", auth_1.verifyToken, organization_1.deleteOrganization);
exports.default = router;
