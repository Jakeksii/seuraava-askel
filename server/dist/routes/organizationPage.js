"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const organizationPage_1 = require("../controllers/organizationPage");
const auth_1 = require("../middleware/auth");
const storage_1 = require("../middleware/storage");
const router = (0, express_1.Router)();
/* READ */
router.post("", auth_1.verifyToken, storage_1.uploadImage, organizationPage_1.createOrganizationPage);
router.get("", organizationPage_1.findOrganizationPage);
exports.default = router;
