import { genSalt, hash } from "bcrypt";
import { Invitation, Organization } from "../connections/MainConnection";
import { User } from "../connections/UserConnection";
import { Request, Response, IUser } from "../types";
import dotenv from "dotenv";
import crypto from 'crypto'

export const createOrganization = async (req: Request, res: Response): Promise<Response> => {
    try {
        const newOrganization = new Organization({
            name: req.body.name,
            business_id: req.body.business_id,
            address: req.body.address,
            contact_info: req.body.contact_info,
            contact_info_visible: req.body.contact_info_visible,
            organization_users: [{
                user_id: req.user._id,
                user_name: req.user.first_name + " " + req.user.last_name,
                user_email: req.user.email,
                role: 'owner'
            }],
            created_by: req.user._id,
            updated_by: req.user._id
        })

        // Check if there is already organization by that name
        if (await Organization.findOne({ name: newOrganization.name })) {
            return res.status(409).json({
                message: "Organization with name " + newOrganization.name + " is already created"
            })
        }

        // Validate organization
        const validationError = newOrganization.validateSync();
        if (validationError) return res.status(400).json({ message: validationError.message });

        //Save organization to DB
        const savedOrganization = await newOrganization.save();

        //Make current user owner of the newly created organization
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $push: {
                    "organizations": {
                        organization_id: savedOrganization._id,
                        organization_name: savedOrganization.name,
                        role: "owner"
                    }
                }
            },
            { safe: true, upsert: true, new: true })

        return res.status(201).json(savedOrganization);

    } catch (error) {
        console.error(error)
        return res.status(500).end()
    }
}

// GET organization
export const getOrganization = async (req: Request, res: Response): Promise<Response> => {
    try {
        const organization = await Organization.findById(req.params.id)
        if (!organization) return res.status(404).json({ message: "Organization not found by id: " + req.params.id });

        const sanitizedOrganization = {
            address: organization._doc.address,
            contact_info: organization._doc.contact_info_visible ? organization._doc.contact_info : null,
            _id: organization._doc._id,
            name: organization._doc.name,
        }
        return res.status(200).json(sanitizedOrganization)

    } catch (error) {
        console.error(error)
        return res.status(500).end()
    }
}

// GET detailed organizatio. requires auth
export const getDetailedOrganization = async (req: Request, res: Response): Promise<Response> => {
    try {

        // Get asked organization from database
        const organization = await Organization.findById(req.organization._id)

        // Get organization invitations
        const invitations = await Invitation.find({ 'organization.organization_id': req.organization._id })

        // Eextract the "organization" field from each item
        const mappedInvitations = invitations.map((invitation) => {
            return {
                invitation: true,
                user_email: invitation.user_email,
                role: invitation.role,
                created_at: invitation.createdAt
            }
        });

        const organizationToSend = {
            _id: organization._doc._id,
            name: organization._doc.name,
            business_id: organization._doc.business_id,
            contact_info_visible: organization._doc.contact_info_visible,
            visible: organization._doc.visible,

            address: organization._doc.address,
            contact_info: organization._doc.contact_info,
            organization_users: [...organization._doc.organization_users],

            created_by: organization._doc.created_by,
            updated_by: organization._doc.updated_by,
            createdAt: organization._doc.createdAt,
            updatedAt: organization._doc.updatedAt,
        }

        organizationToSend.organization_users.push(...mappedInvitations)

        // Return full organization details
        return res.status(200).json(organizationToSend)

    } catch (error) {
        console.error(error)
        return res.status(500).end()
    }
}

// DELETE organization. Needs verification. User needs to be owner
export const deleteOrganization = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Find organization by id from requesting user data
        // And test if user role is owner in that organization
        const user_organization = req.user.organizations.find((organization) => organization.organization_id.equals(req.params.id))
        if (!user_organization || (user_organization.role !== "owner")) return res.status(403).end();

        // Delete organization from database
        await Organization.findByIdAndDelete(req.params.id)

        //Remove organization from every user
        const updatedUsers = (await User.updateMany({ $pull: { "organizations": { organization_id: req.params.id } } })).modifiedCount

        return res.status(200).json({ organizationsDeleted: 1, usersUpdated: updatedUsers })

    } catch (error) {
        console.error(error)
        return res.status(500).end()
    }
}

// WOO TEST
dotenv.config();
export async function wooIntegrationTest(req: Request, res: Response): Promise<Response> {
    try {
        const providedSignature = req.header('X-WC-Webhook-Signature');
        console.log(providedSignature)

        // Calculate the expected signature using your webhook secret
        const expectedSignature = crypto
            .createHmac('sha256', process.env.WOO_SECRET!)
            .update(JSON.stringify(req.body))
            .digest('base64');

        if(providedSignature !== expectedSignature) return res.status(401).end()


        // find user or create
        let user: IUser | null = await User.findOne({ email: req.body.billing.email })
        if (!user) {
            //salt and hash
            const salt = await genSalt();
            const passwordHash = await hash('testi', salt);

            const newUser = new User({
                first_name: req.body.billing.first_name,
                last_name: req.body.billing.last_name,
                email: req.body.billing.email,
                password: passwordHash,
            });

            const validationError = newUser.validateSync();
            if (validationError) return res.status(400).json({ message: validationError.message });

            // Save user to db
            user = await newUser.save();
        }
        if (!user) return res.status(500).end()

        // create org for that user
        const newOrganization = new Organization({
            name: req.body.billing.company + " " + Date.now(), // just cause we cannot create 2 org w same name
            business_id: 'Y-12112',
            address: {
                "street": "Wärtsilänkatu 8",
                "city": "Järvenpää",
                "state": "Uusimaa",
                "zipcode": "04410",
                "country": "Finland",
                "coordinates": [60.48038566303072, 25.081171525458853]
            },
            contact_info: {
                "email": "arkki@svk.fi",
                "phone": "0103289473"
            },
            contact_info_visible: false,
            organization_users: [{
                user_id: user._id,
                user_name: user.first_name + " " + user.last_name,
                user_email: user.email,
                role: 'owner'
            }],
            created_by: user._id,
            updated_by: user._id
        })

        const savedOrganization = await newOrganization.save()

        //Make current user owner of the newly created organization
        await User.findByIdAndUpdate(
            user._id,
            {
                $push: {
                    "organizations": {
                        organization_id: savedOrganization._id,
                        organization_name: savedOrganization.name,
                        role: "owner"
                    }
                }
            },
            { safe: true, upsert: true, new: true })


        return res.status(201).end()
    } catch (error) {
        console.error(error)
        return res.status(500).end()
    }
}