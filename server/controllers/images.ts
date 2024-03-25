import { Request, Response } from '../types';



export async function Upload(req: Request, res: Response) {
    try {
        return res.status(200).end()
    } catch (error) {
        console.error(error)
        return res.status(500).end();
    }
}



export async function Delete(req: Request, res: Response) {
    try {
        return res.status(200).end()
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