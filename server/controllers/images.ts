
import { BlobServiceClient } from '@azure/storage-blob';
import dotenv from 'dotenv';
import { Request, Response } from "../types";

dotenv.config()
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
if (!AZURE_STORAGE_CONNECTION_STRING) {
    throw Error('Azure Storage Connection string not found');
}
// Create the BlobServiceClient object with connection string
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

export async function createContainer(req: Request, res: Response) {
    try {
        // Create a unique name for the container
        const containerName = 'images'

        console.log('\nCreating container...');
        console.log('\t', containerName);

        // Get a reference to a container
        const containerClient = blobServiceClient.getContainerClient(containerName);
        // Create the container
        const response = await containerClient.create();

        return res.status(201).json({ message: `Container was created successfully.\n\trequestId:${response.requestId}\n\tURL: ${containerClient.url}` })
    } catch (error) {
        console.error(error)
        return res.status(500).end();
    }
}

export async function getImage(req: Request, res: Response) {
    try {
        const image_id = req.params._id
        const extension = image_id.split('.').at(-1)
        console.log(extension)
        const containerName = 'organization-ef307fec-ed51-4a47-b4ba-bf94f4f02cd5'
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(image_id);
        const downloadBlockBlobResponse = await blockBlobClient.download(0);

        res.setHeader('Content-Type', downloadBlockBlobResponse.contentType ?? 'application/octet-stream');
        return downloadBlockBlobResponse.readableStreamBody?.pipe(res).status(200)

    } catch (error: any) {
        if(error.statusCode === 404) return res.status(404).end()
        console.error(error)
        return res.status(500).end();
    }
}

export async function createImage(req: Request, res: Response) {
    try {
        // Check if we have image
        const organization_id = req.header('Organization') as string
        if (!req.file || !organization_id) return res.status(400).end()

        // create virtual folder structure
        const blobName = organization_id+'/'+req.file.originalname
        const containerClient = blobServiceClient.getContainerClient('images');
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        // Set content type in blobHTTPHeaders
        const blobHTTPHeaders = {
            blobContentType: req.file.mimetype, // Assuming 'mimetype' contains the content type of the image
        };

        // Upload blob with content type specified
        const uploadBlobResponse = await blockBlobClient.upload(
            req.file.buffer,
            req.file.buffer.length,
            { blobHTTPHeaders }
        );
        
        return res.status(201).end()
    } catch (error) {
        console.error(error)
        return res.status(500).end();
    }
}