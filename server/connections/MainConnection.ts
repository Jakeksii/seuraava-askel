import dotenv from "dotenv";
import mongoose from "mongoose";
import EventSchema from "../schemas/Event.js";
import EventPageSchema from "../schemas/EventPage.js";
import InvitationSchema from "../schemas/Invitation.js";
import OrganizationSchema from "../schemas/Organization.js";
import OrganizationPageSchema from "../schemas/OrganizationPage.js";

dotenv.config();
const url:string = process.env.MONGO_URL_MAIN ?? ""
const MainConn = mongoose.createConnection(url)

MainConn.model("Event", EventSchema)
MainConn.model("EventPage", EventPageSchema)
MainConn.model("Invitation", InvitationSchema)
MainConn.model("Organization", OrganizationSchema)
MainConn.model("OrganizationPage", OrganizationPageSchema)

export const Event = MainConn.models.Event
export const EventPage = MainConn.models.Event
export const Invitation = MainConn.models.Invitation
export const Organization = MainConn.models.Organization
export const OrganizationPage = MainConn.models.OrganizationPage

export default MainConn