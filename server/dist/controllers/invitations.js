"use strict";
/*

Implementing an invite/join link system for logged-in users in a MERN stack application involves a few steps. Here's a high-level overview of the best practices you can follow:

1. Generate Unique Join Links: When a user initiates an invitation, generate a unique join link that can be shared with others. This link should contain a unique identifier, such as a token or a random string, that can be used to identify the invitation.

2. Store Invitation Data: Create a database schema to store the invitation details. This schema should include information such as the inviter's ID, the recipient's email or username, the status of the invitation, and any other relevant data.

3. Send Invitations: Use a method to send invitations to the intended recipients, such as sending an email or a notification within your application. Include the generated join link in the invitation message.

4. Handle Link Access: Create an endpoint in your backend API to handle the join link access. When the recipient clicks on the join link, they should be redirected to this endpoint.

5. Verify Link Validity: In the backend, verify the join link's validity by checking if the unique identifier exists in the database and if the invitation is still valid (e.g., not expired or already accepted). Retrieve the invitation details and associate the recipient with the inviter in your database.

6. Implement Join Logic: Once the link is verified, handle the join logic based on your application's requirements. This may involve adding the recipient to a specific group, updating their permissions, or any other relevant actions.

7. Redirect or Notify: After the join logic is executed successfully, you can redirect the user to a specific page within your application or display a notification indicating the successful joining process.

Remember to implement proper error handling and validation throughout the process to ensure the security and reliability of your application. Additionally, you might consider adding additional security measures, such as including an expiration time for the join links or adding authentication checks before executing the join logic.

These are general best practices, and the actual implementation may vary based on your specific application requirements.

*/
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
exports.create = exports.decline = exports.accept = void 0;
const MainConnection_1 = require("../connections/MainConnection");
const accept = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Deletes invitation
});
exports.accept = accept;
const decline = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Deletes invitation
});
exports.decline = decline;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.organization_id ||
            !req.body.user_email)
            return res.status(400).end();
        const organization = req.user.organizations.find((organization) => organization.organization_id.equals(req.body.organization_id));
        // If user organizations returned undefined
        // then user has no acces to that organization
        if (!organization)
            return res.status(403).end();
        //Check if invitation already exists then delete it and create new
        const query = { user_email: req.body.user_email, "organization.organization_id": organization.organization_id };
        yield MainConnection_1.Invitation.findOneAndDelete(query);
        const newInvitation = new MainConnection_1.Invitation({
            user_email: req.body.user_email,
            organization: {
                organization_id: organization.organization_id,
                organization_name: organization.organization_name
            },
            created_by: req.user._id
        });
        const invitation = yield newInvitation.save();
        return res.status(201).json(invitation);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
});
exports.create = create;