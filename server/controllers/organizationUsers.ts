import { Invitation, Organization } from "../connections/MainConnection";
import { User } from "../connections/UserConnection";
import { IOrganizationUser, Request, Response } from "../types";

// This api is for adding or updating organization users
export async function InviteOrUpdate(req: Request, res: Response) {
    try {
        // Check if you are trying to change your own role
        if(!req.body.user_email) return res.status(400).json({ message: 'user_email not provided' });
        if(req.user.email === req.body.user_email) return res.status(400).json({ message: 'You cannot change your own role' });

        // Validate role
        if (!new Set(['user', 'admin', 'owner']).has(req.body.role)) return res.status(400).json({ message: 'Role is not valid' });

        // We know that user access role to this organization is atleast 'user', because we have middleware that prevents code reaching here if no.
        // But we test if role is atleast 'admin'
        if (!new Set(['owner', 'admin']).has(req.organization.role)) return res.status(403).json({ message: 'Your access role is not high enough' })

        // Get organization users and check if user already exist in that organization
        const organizationUsers = await Organization.findById(req.organization._id).select('organization_users').exec() as { organization_users: IOrganizationUser[] }

        const organizationUser = organizationUsers.organization_users.find((user) => user.user_email === req.body.user_email)

        if (organizationUser) { 
            if (organizationUser.role !== req.body.role) { // Check if role is going to change then update
                if(req.body.role === 'owner') { // We are going to change ownership
                    if(req.organization.role !== 'owner') return res.status(403).json({ message: 'Your access role is not high enough' });
                    (await ChangeOwner(req, res)).end()
                } else {
                    (await Update(req, res)).end()
                }
            } else {
                return res.status(204).end()
            }
        } else {
            await Invite(req, res)
        }
    }

    catch (error) {
        console.error(error)
        return res.status(500).end()
    }
}
async function Invite(req: Request, res: Response) {
    // Create invitation
    const invitationData = {
        user_email: req.body.user_email,
        role: req.body.role,
        organization: {
            organization_id: req.organization._id,
            organization_name: req.organization.organization_name
        },
        created_by: req.user._id
    }

    // Validate invitation
    const validationError = await new Invitation(invitationData).validateSync();
    if (validationError) {
        return res.status(400).json({ message: validationError.message });
    }

    // If an existing invitation is found, replace it with a new one
    const query = { user_email: req.body.user_email, "organization.organization_id": req.organization._id }
    const savedInvitation = await Invitation.findOneAndReplace(query, invitationData, {
        new: true, // To return the updated document
        upsert: true, // Create a new document if it doesn't exist
    });

    // send email message of invitation
    // senEmail(email))

    return res.status(201).json(savedInvitation)
}
async function Update(req: Request, res: Response) {

    // UPDATE ORGANIZATION USERS
    const user = req.user
    const organization_id = req.organization._id

    const query = {
        _id: organization_id,
        'organization_users.user_email': req.body.user_email,
    }
    const update = {
        $set: {
            'organization_users.$.role': req.body.role,
            'organization_users.$.updated_at': Date.now(),
            'organization_users.$.updated_by': user._id,
        }
    }
    const options = {
        new: true
    }
    await Organization.findOneAndUpdate(query, update, options).exec();


    // UPDATE USER ORGANIZATIONS
    const userQuery = {
        email: req.body.user_email,
        'organizations.organization_id': organization_id
    }
    const userUpdate = {
        $set: {
            'organizations.$.role': req.body.role,
            'organizations.$.updated_at': Date.now(),
            'organizations.$.updated_by': user._id
        }
    }
    await User.findOneAndUpdate(userQuery, userUpdate, options).exec()

    // OK
    return res.status(205).end()
}
async function ChangeOwner(req: Request, res: Response) {

    // UPDATE ORGANIZATION USERS
    const user = req.user
    const organization_id = req.organization._id

    const query = {
        _id: organization_id,
        'organization_users.user_email': req.body.user_email,
    }
    const update = {
        $set: {
            'organization_users.$.role': req.body.role,
            'organization_users.$.updated_at': Date.now(),
            'organization_users.$.updated_by': user._id,
        }
    }
    const options = {
        new: true
    }
    await Organization.findOneAndUpdate(query, update, options).exec();


    // UPDATE USER ORGANIZATIONS
    const userQuery = {
        email: req.body.user_email,
        'organizations.organization_id': organization_id
    }
    const userUpdate = {
        $set: {
            'organizations.$.role': req.body.role,
            'organizations.$.updated_at': Date.now(),
            'organizations.$.updated_by': user._id
        }
    }
    await User.findOneAndUpdate(userQuery, userUpdate, options).exec()

    // OK
    return res.status(205).end()
}