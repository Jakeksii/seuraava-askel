import mongoose from "mongoose";
import dotenv from "dotenv";

import EventSchema, { IEvent } from "../schemas/Event.js";
import EventPageSchema, { IEventPage } from "../schemas/EventPage.js";
import InvitationSchema, { IInvitation } from "../schemas/Invitation.js";
import OrganizationSchema, { IOrganization } from "../schemas/Organization.js";
import OrganizationPageSchema, { IOrganizationPage } from "../schemas/OrganizationPage.js";

dotenv.config();
const url:string = process.env.MONGO_URL_MAIN ?? ""
const MainConn = mongoose.createConnection(url)

MainConn.model<IEvent>("Event", EventSchema)
MainConn.model<IEventPage>("EventPage", EventPageSchema)
MainConn.model<IInvitation>("Invitation", InvitationSchema)
MainConn.model<IOrganization>("Organization", OrganizationSchema)
MainConn.model<IOrganizationPage>("OrganizationPage", OrganizationPageSchema)

export const Event = MainConn.models.Event
export const EventPage = MainConn.models.Event
export const Invitation = MainConn.models.Invitation
export const Organization = MainConn.models.Organization
export const OrganizationPage = MainConn.models.OrganizationPage

export default MainConn