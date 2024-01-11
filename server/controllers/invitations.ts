import { Types } from "mongoose";
import { Invitation, Organization } from "../connections/MainConnection";
import { User } from "../connections/UserConnection";
import { Request, Response } from "../types";

export const accept = async (req: Request, res: Response) => {
    try {

        const invitation_id = req.params.id
        if (!Types.ObjectId.isValid(invitation_id)) return res.status(400).json({ message: 'Id provided is not valid ObjectId' })

        // Get invitation and delete it from DB
        const {value: invitation} = await Invitation.findByIdAndDelete(invitation_id)
        if (!invitation) return res.status(404).end()

        // Check if user has right to use this invitation object
        const user = req.user
        if (invitation.user_email !== user.email) return res.status(403).end()

        // Add user to organization
        const organization_id = invitation.organization.organization_id
        const organization = await Organization.findByIdAndUpdate(organization_id, {
            $push: {
                organization_users: {
                    user_id: user._id,
                    user_name: user.first_name + " " + req.user.last_name,
                    user_email: user.email,
                    role: invitation.role,
                    invited_by: invitation.created_by,
                    created_at: Date.now()
                }
            }
        })

        // Add organization to user
        await User.findByIdAndUpdate(user._id, {
            $push: {
                organizations: {
                    organization_id: organization._id,
                    organization_name: organization.name,
                    role: invitation.role,
                    invited_by: invitation.created_by,
                    created_at: Date.now()
                }
            }
        })

        // OK
        return res.status(200).json({
            organization_id: organization._id,
            organization_name: organization.name,
            role: invitation.role,
            created_at: Date.now()
        })

    } catch (error) {
        console.error(error)
        return res.status(500).end()
    }
}

export const decline = async (req: Request, res: Response) => {
    try {

        const invitation_id = req.params.id
        if (!Types.ObjectId.isValid(invitation_id)) return res.status(400).json({ message: 'Id provided is not valid ObjectId' })

        // Get invitation and delete it from DB
        const {value: invitation} = await Invitation.findByIdAndDelete(invitation_id)
        if (!invitation) return res.status(404).end()

        // Check if user has right to use this invitation object
        const user = req.user
        if (invitation.user_email !== user.email) return res.status(403).end()

        // OK
        return res.status(204).end()

    } catch (error) {
        console.error(error)
        return res.status(500).end()
    }
}

//Checks if there is invitations
export const check = async (req: Request, res: Response) => {
    try {
        // Find invitations with user email
        const invitations = await Invitation.find({ user_email: req.user.email })

        // Eextract the "organization" field from each item
        const mappedInvitations = invitations.map((invitation) => {
            return {
                _id: invitation._id,
                organization: {
                    _id: invitation.organization.organization_id,
                    name: invitation.organization.organization_name
                },
                role: invitation.role,
                createdAt: invitation.createdAt
            }
        });

        // Return invitations to client
        return res.status(200).json(mappedInvitations)
    } catch (error) {
        console.error(error)
        return res.status(500).end()
    }
}