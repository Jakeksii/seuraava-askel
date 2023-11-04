import { Response, Request } from "../types";
import { Organization, OrganizationPage } from "../connections/MainConnection";
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary'
import { sanitizeHTML } from "../Functions/sanitizeHTML";

export const createOrganizationPage = async (req: Request, res: Response) => {
    try {
        // Validate image
        if (!req.file) return res.status(400).end()
        const image = req.file.buffer

        // Get organization
        // We know that user access role to this organization is atleast 'user', because we have middleware that prevents code reaching here if no.
        // But we test if role is atleast 'admin'
        const organization = req.organization
        if (!new Set(['owner', 'admin']).has(organization.role)) return res.status(403).json({ message: 'Your access role is not high enough' });

        const page = sanitizeHTML(req.body.page)

        const newPage = new OrganizationPage({
            organization_name: organization.organization_name,
            organization_id: organization._id,
            image_id: '', // Set after cloudinary upload
            page_data: page,
            created_by: req.user._id,
            updated_by: req.user._id
        })

        // Validate organization page
        const validationError = newPage.validateSync();
        if (validationError) {
            return res.status(400).json({ message: validationError.message });
        }

        // Upload the image to cloudinary
        cloudinary.uploader.upload_stream({ resource_type: "image" }, uploadDone).end(image)
        async function uploadDone(error: any, result: UploadApiResponse | undefined) {
            if (error) {
                console.error("Error in cloudinary.uploader.upload_stream\n", error);
                return res.status(500).json({ error: "Internal Server Error when uploading image" });
            }
            // Pass url to newPage
            newPage.image_id = result?.public_id

            // save created page to db
            const savedPage = await newPage.save()
            // return saved page to client
            return res.status(201).json(savedPage)
        }
    } catch (error) {
        console.error(error)
        return res.status(500).end();
    }
}

export const findOrganizationPage = async (req: Request, res: Response): Promise<Response> => {
    if (!req.query.name) {
        return res.status(400).end();
    }
    const query = { organization_name: req.query.name }

    try {
        const page = await OrganizationPage.findOne(query)
        if (!page) return res.status(404).end();
        const organization = await Organization.findById(page.organization_id)

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
        }

        return res.status(200).json(data);

    } catch (error: any) {
        return res.status(500).json({ error: error.message })
    }
}