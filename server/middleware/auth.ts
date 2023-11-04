import { verify } from "jsonwebtoken";
import { User } from "../connections/UserConnection";
import { IUser, NextFunction, Request, Response } from "../types";

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        // Check if Authorization token is provided in headers
        const token = req.header("Authorization");
        if (!token) return res.status(401).json({ message: "Access Denied: No authorization token" });

        try {
            // Verify provided token
            const secret: string = process.env.JWT_SECRET ?? ""
            const verified = verify(token, secret) as string

            // Find user from DB with id that came from decrypted token
            const user = await User.findById(verified)
            if (!user) return res.status(401).json({ message: "Access Denied: Bad authorization token" });

            // Save user to req obj so that we can use it troughout our request processing pipeline
            req.user = user as IUser;

            // Continue request processing pipeline
            return next();

        } catch (_) {
            return res.status(401).json({ message: "Access Denied: Bad authorization token" });
        }

    } catch (error) {
        console.error(error)
        return res.status(500).end()
    }
}

// If this middleware is used it must happen after verifyToken middleware because it depens on it
// This middleware checks if user has access to organization and saves users role and organization to req obj
// In controllers you can then access this reliable info from req obj
export async function verifyOrganizationAccess(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
        // Check if user has given a organization
        const organization_id = req.header('Organization') as string
        if (!organization_id) return res.status(401).json({ message: "Access Denied: No organization given" });

        // Validate user access to organization
        // Find organization by id from requesting user data
        // Remember that req.user is reliable user data. We get it from verifyToken middleware.
        const organization = req.user.organizations.find((organization) => organization.organization_id.equals(organization_id))

        // Test if organization is found in user org list and user role is owner, admin or user in that organization
        // If no we send client 403 FORBIDDEN
        if (!organization || !new Set(['owner', 'admin', 'user']).has(organization.role)) {
            return res.status(403).json({ message: 'You have no access to given organization' });
        }

        // Save organization and role to req obj so that we can use the info troughout our request processing pipeline
        req.organization = {
            _id: organization.organization_id,
            organization_name: organization.organization_name,
            role: organization.role
        }
        // Now in controllers we only need to check if req.organization.role === 'The role we need'
        // Or we can respond to client diffrently according to role

        // Continue request processing pipeline
        return next()

    } catch (error) {
        console.error(error)
        return res.status(500).end()
    }
}