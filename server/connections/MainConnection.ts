import dotenv from "dotenv";
import mongoose from "mongoose";
import EventSchema from "../schemas/Event";
import ImageSchema from "../schemas/Image";
import InvitationSchema from "../schemas/Invitation";
import OrganizationSchema from "../schemas/Organization";

dotenv.config();
const url = process.env.USING_PUBLIC_DB ? (process.env.MONGO_URL_MAIN!) : (process.env.MONGO_URL_MAIN_LOCAL!)
const MainConn = mongoose.createConnection(url)

MainConn.model("Event", EventSchema)
MainConn.model("Image", ImageSchema)
MainConn.model("Invitation", InvitationSchema)
MainConn.model("Organization", OrganizationSchema)

export const Event = MainConn.models.Event
export const Image = MainConn.models.Image
export const Invitation = MainConn.models.Invitation
export const Organization = MainConn.models.Organization

export default MainConn
