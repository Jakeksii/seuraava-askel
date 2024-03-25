import { Request, Response } from '../types';
import { Image } from "../connections/MainConnection"
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary'


export async function Upload(req: Request, res: Response) {
    try {
        // Check if we have image
        if (!req.file) return res.status(400).end()

        // Check if we have name
        if (!req.body.name) return res.status(400).end()

        // Get organization
        // We know that user access role to this organization is atleast 'user', because we have middleware that prevents code reaching here if no.
        const organization = req.organization

        // Create image object
        const image = new Image({
            name: req.body.name,
            organization_id: organization._id,
            created_by: req.user._id,
            updated_by: req.user._id
        })

        // Validate image
        const validationError = await image.validateSync();
        if (validationError) {
            return res.status(400).json({ message: validationError.message });
        }

        // Upload the image to cloudinary and after that save image object to db
        const image_public_id = `${organization._id}/${image._id}`

        cloudinary.uploader.upload_stream({ resource_type: "image", public_id: image_public_id }, uploadDone).end(req.file.buffer)
        async function uploadDone(error: any, result: UploadApiResponse | undefined) {
            if (error) {
                console.error("Error in cloudinary.uploader.upload_stream\n", error);
                return res.status(500).json({ error: "Internal Server Error when uploading image" });
            }

            // save created image object to db
            const saved_image = await image.save()

            // return saved event to client
            return res.status(201).json(saved_image)
        }

    } catch (error) {
        console.error(error)
        return res.status(500).end();
    }
}


export async function Get(req: Request, res: Response) {
    try {
        // Get organization
        // We know that user access role to this organization is atleast 'user', because we have middleware that prevents code reaching here if no.
        const organization = req.organization

        // Get all image objects with provided org _id
        const images = await Image.find({ organization_id: organization._id })

        // Send images to client
        return res.status(200).json(images)

    } catch (error) {
        console.error(error)
        return res.status(500).end();
    }
}

function isStringArrayNotEmpty(variable: any) {
    // Check if the variable is an array
    if (Array.isArray(variable)) {
        // Check if the array is not empty
        if (variable.length > 0) {
            // Check if all elements in the array are strings
            return variable.every(element => typeof element === 'string');
        }
    }
    return false;
}

export async function Delete(req: Request, res: Response) {
    try {
        // Get organization
        const organization = req.organization

        if(!isStringArrayNotEmpty(req.body)) return res.status(400).json({message:'body needs to contain string array'})
        const image_ids = req.body.map((_id: string) => `${organization._id}/${_id}`) as string[]
        const image_object_ids = req.body as string[]

        cloudinary.api
            .delete_resources(image_ids)
            .then(async () => {
                
                // Delete image objects also from DB
                await Image.deleteMany({ _id: { $in: image_object_ids }})
                return res.status(204).end()
            })
            .catch((error) => {
                console.error(error)
                return res.status(500).end();
            })

    } catch (error) {
        console.error(error)
        return res.status(500).end();
    }
}



export async function Update(req: Request, res: Response) {
    try {
        return res.status(501).end() // NOT IMPLEMENTED
    } catch (error) {
        console.error(error)
        return res.status(500).end();
    }
}