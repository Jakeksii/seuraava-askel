"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOrganizationPage = exports.createOrganizationPage = void 0;
const MainConnection_1 = require("../connections/MainConnection");
const cloudinary_1 = require("cloudinary");
const sanitizeHTML_1 = require("../Functions/sanitizeHTML");
const createOrganizationPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate image
    if (!req.file)
        return res.status(400).end();
    const image = req.file.buffer;
    // Validate user access to organization
    // Find organization by id from requesting user data
    // And test if user role is owner, admin or user in that organization
    const organization = req.user.organizations.find((organization) => organization.organization_id.equals(req.body.organization_id));
    if (!organization ||
        (organization.role !== "owner" &&
            organization.role !== "admin" &&
            organization.role !== "user")) {
        return res.status(403).end();
    }
    const page = (0, sanitizeHTML_1.sanitizeHTML)(req.body.page);
    const newPage = new MainConnection_1.OrganizationPage({
        organization_name: organization.organization_name,
        organization_id: organization.organization_id,
        image_id: '',
        page_data: page,
        created_by: req.user._id,
        updated_by: req.user._id
    });
    const validationError = newPage.validateSync();
    if (validationError) {
        return res.status(400).json({ message: validationError.message });
    }
    // Upload the image to cloudinary
    cloudinary_1.v2.uploader.upload_stream({ resource_type: "image" }, uploadDone).end(image);
    function uploadDone(error, result) {
        return __awaiter(this, void 0, void 0, function* () {
            if (error) {
                console.log("Error in cloudinary.uploader.upload_stream\n", error);
                return res.status(500).json({ error: error });
            }
            // Pass url to newPage
            newPage.image_id = result === null || result === void 0 ? void 0 : result.public_id;
            try {
                // save created page to db
                const savedPage = yield newPage.save();
                // return saved page to client
                return res.status(201).json(savedPage);
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
});
exports.createOrganizationPage = createOrganizationPage;
const findOrganizationPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.name) {
        return res.status(400).end();
    }
    const query = { organization_name: req.query.name };
    try {
        const page = yield MainConnection_1.OrganizationPage.findOne(query);
        if (!page)
            return res.status(404).end();
        const organization = yield MainConnection_1.Organization.findById(page.organization_id);
        const data = {
            organization: {
                name: organization.name,
                address: organization.address,
                contact_info: organization.contact_info_visible ? organization.contact_info : {},
                updatedAt: organization.updatedAt
            },
            image_id: page.image_id,
            data: page.page_data,
            updatedAt: page.updatedAt
        };
        return res.status(200).json(data);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.findOrganizationPage = findOrganizationPage;
