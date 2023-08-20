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
exports.deleteOrganization = exports.getDetailedOrganization = exports.getOrganization = exports.createOrganization = void 0;
const MainConnection_1 = require("../connections/MainConnection");
const UserConnection_1 = require("../connections/UserConnection");
const createOrganization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, business_id, address, contact_info, contact_info_visible } = req.body;
        const user = req.user;
        if (user.organizations[0])
            return res.status(409).json({ message: "You have already created or joined organization" });
        const newOrganization = new MainConnection_1.Organization({
            name,
            business_id,
            address,
            contact_info,
            contact_info_visible,
            organization_users: [{
                    user_id: user._id,
                    user_name: user.first_name + " " + user.last_name,
                    user_email: user.email,
                    role: 'owner'
                }],
            created_by: user._id,
            updated_by: user._id
        });
        if (yield MainConnection_1.Organization.findOne({ name: name })) {
            return res.status(409).json({
                message: "Organization with name " + name + " is already created"
            });
        }
        const validationError = newOrganization.validateSync();
        if (validationError)
            return res.status(400).json({ message: validationError.message });
        //Create organization
        const savedOrganization = yield newOrganization.save();
        //Make current user owner of the newly created organization
        yield UserConnection_1.User.findByIdAndUpdate(user._id, { $push: { "organizations": {
                    organization_id: savedOrganization._id,
                    organization_name: savedOrganization.name,
                    role: "owner"
                } } }, { safe: true, upsert: true, new: true });
        return res.status(200).json(savedOrganization);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
});
exports.createOrganization = createOrganization;
// GET organization
const getOrganization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organization = yield MainConnection_1.Organization.findById(req.params.id);
        if (!organization)
            return res.status(404).json({ message: "Organization not found by id: " + req.params.id });
        const sanitizedOrganization = {
            address: organization._doc.address,
            contact_info: organization._doc.contact_info_visible ? organization._doc.contact_info : null,
            _id: organization._doc._id,
            name: organization._doc.name,
        };
        return res.status(200).json(sanitizedOrganization);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getOrganization = getOrganization;
// GET detailed organizatio. requires auth
const getDetailedOrganization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find organization by id from requesting user data
        // And test if user role is owner or admin in that organization
        const user_organization = req.user.organizations.find((organization) => organization.organization_id.equals(req.params.id));
        if (!user_organization || (user_organization.role !== "owner" && user_organization.role !== "admin"))
            return res.status(403).end();
        // Get asked organization from database
        const organization = yield MainConnection_1.Organization.findById(req.params.id);
        if (!organization)
            return res.status(404).json({ message: "Organization not found by id: " + req.params.id });
        // Return full organization details
        return res.status(200).json(organization._doc);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
});
exports.getDetailedOrganization = getDetailedOrganization;
// DELETE organization. Needs verification. User needs to be owner
const deleteOrganization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find organization by id from requesting user data
        // And test if user role is owner in that organization
        const user_organization = req.user.organizations.find((organization) => organization.organization_id.equals(req.params.id));
        if (!user_organization || (user_organization.role !== "owner"))
            return res.status(403).end();
        // Delete organization from database
        yield MainConnection_1.Organization.findByIdAndDelete(req.params.id);
        //Remove organization from every user
        const updatedUsers = (yield UserConnection_1.User.updateMany({ $pull: { "organizations": { organization_id: req.params.id } } })).modifiedCount;
        return res.status(200).json({ organizationsDeleted: 1, usersUpdated: updatedUsers });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
});
exports.deleteOrganization = deleteOrganization;
