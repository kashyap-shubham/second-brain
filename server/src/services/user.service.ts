import { Document } from "mongoose";
import { IUserDocument, User } from "../models/user.model";



export interface IUserService {
    createUser(email: string, password: string, userName: string): Promise<Document>;

    authenticateUser(email: string, password: string): Promise<string>;
}
