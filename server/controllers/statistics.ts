import { Organization } from "../connections/MainConnection";
import { User } from "../connections/UserConnection";
import { EventStats } from "../connections/StatsConnection";
import { Request, Response, IUser } from "../types";
import mongoose from "mongoose";


export const postEventClicks = async (req:Request, res:Response):Promise<Response> => {

    const data = req.body

    if(typeof data !== "number") {
        console.log("The data aint numbers, hoe")
    }

    try {
        


        return res.status(200).json({msg: "yes works"});
    } catch (error:any) {
        return res.status(500).json({ error: error.message });
    }
}

export const getTest = async (req:Request, res:Response):Promise<Response> => {

    const data = await EventStats.find()

    return res.status(200).json(data);

}