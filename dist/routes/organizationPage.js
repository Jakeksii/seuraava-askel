"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const organizationPage_js_1 = require("../controllers/organizationPage.js");
const auth_js_1 = require("../middleware/auth.js");
const storage_js_1 = require("../middleware/storage.js");
const router = (0, express_1.Router)();
/* READ */
router.post("", auth_js_1.verifyToken, storage_js_1.uploadImage, organizationPage_js_1.createOrganizationPage);
router.get("", organizationPage_js_1.findOrganizationPage);
exports.default = router;
