import { Schema, Types} from "mongoose";

export interface IOrganizationPage {
    _id: Types.ObjectId
    organization_name: String
    organization_id: Types.ObjectId
    image_id: string
    page_data: string
    created_by: Types.ObjectId
    updated_by: Types.ObjectId
    createdAt?: Date,
    updatedAt?: Date,
    __v?: number
}

const OrganizationPage = new Schema<IOrganizationPage>({

    organization_name: {type: String, unique: true, index: true},
    organization_id: Types.ObjectId,
    image_id: String,
    page_data: String,
    created_by: Types.ObjectId,
    updated_by: Types.ObjectId

}, {timestamps: true}); //adds createdAt, updatedAt

export default OrganizationPage;