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
exports.deleteUser = exports.getCurrentUser = void 0;
const MainConnection_js_1 = require("../connections/MainConnection.js");
const UserConnection_js_1 = require("../connections/UserConnection.js");
/* READ */
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserConnection_js_1.User.findById(req.user._id);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        const sanitizedUser = Object.assign({}, user._doc);
        delete sanitizedUser.password;
        return res.status(200).json(sanitizedUser);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getCurrentUser = getCurrentUser;
// DELETE user. Needs verification.
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Find and Delete user from DB
        const deletedUser = yield UserConnection_js_1.User.findByIdAndDelete(req.user._id);
        if (!deletedUser)
            return res.status(404).json({ message: "User not found" });
        // Find all organizations that user was owner in
        const userOrganizations = req.user.organizations.filter((organization) => organization.role === "owner");
        if (!userOrganizations)
            return res.status(200).json({ usersDeleted: 1, organizationsDeleted: 0 });
        // Map ids to use in deletion functions
        const organizationIds = userOrganizations.map((organization) => organization.organization_id);
        //Remove those organizations that user owns
        const deletedOrganizations = (yield MainConnection_js_1.Organization.deleteMany({ _id: { $in: organizationIds } })).deletedCount;
        //Remove organization from every users info
        const updatedUsers = (yield UserConnection_js_1.User.updateMany({ $pull: { "organizations": { organization_id: req.params.id } } })).modifiedCount;
        return res.status(200).json({ usersDeleted: 1, organizationsDeleted: deletedOrganizations, usersUpdated: updatedUsers });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.deleteUser = deleteUser;
