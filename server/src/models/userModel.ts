import mongoose, { Document, Schema, Model } from "mongoose";


export interface IUser {
    password: string;
    email: string;
    userName: string;
    createdAt: Date;
    updateAt: Date;
}

export type IUserDocument = IUser & Document;


export type IUserModel = Model<IUserDocument>;


const UserSchema = new Schema<IUserDocument>(
    {
        userName: { type: String},
        password: { type: String},
        email: { type: String, unique: true},
    },
    { timestamps: true }
);


const User = mongoose.model<IUserDocument, IUserModel>(
    "User", 
    UserSchema
);