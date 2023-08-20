import { 
    Request as ExpressRequest, 
    Response as ExpressResponse, 
    NextFunction as ExpressNextFunction } from "express";

import { IUser } from "../schemas/User";

// EXPRESS
export interface Request extends ExpressRequest {
    user: IUser
}
export interface Response extends ExpressResponse {}
export interface NextFunction extends ExpressNextFunction {}


