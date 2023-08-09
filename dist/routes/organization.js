"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const organization_js_1 = require("../controllers/organization.js");
const auth_js_1 = require("../middleware/auth.js");
const router = (0, express_1.Router)();
/* READ */
router.post("", auth_js_1.verifyToken, organization_js_1.createOrganization);
router.get("/:id", organization_js_1.getOrganization);
router.get("/:id/detailed", auth_js_1.verifyToken, organization_js_1.getDetailedOrganization);
router.delete("/:id", auth_js_1.verifyToken, organization_js_1.deleteOrganization);
exports.default = router;
