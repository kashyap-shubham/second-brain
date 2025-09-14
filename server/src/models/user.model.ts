import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { ApiError } from "../utils/apiError";
import { HttpStatus } from "../constants/httpStatus";


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


UserSchema.pre("save", async function(next) {
    const user = this as IUserDocument;

    if (!user.isModified("password")) {
        return next();
    }

    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        next();
    
    } catch(error) {
        next(new ApiError("Failed to hash the password", HttpStatus.INTERNAL_SERVER_ERROR));
    }
});


UserSchema.methods.comparePassword = async function(enteredPassword: string): Promise<boolean> {
    try {
        return await bcrypt.compare(enteredPassword, this.password);
    } catch(error) {
        throw new ApiError("Error comparing passwords", HttpStatus.INTERNAL_SERVER_ERROR);
    }
};


UserSchema.methods.generateAuthToken = function(this: IUserDocument): string {
    
    try {
        const payload: {
            id: string;
            email: string
        } = { 
            id: this._id.toString(), 
            email: this.email 
        };

        const secret: string | undefined = process.env.JWT_SECRET ;

        if (!secret) {
            throw new ApiError("Failed to get the secret", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
        const options: SignOptions = { expiresIn: "1h" };

        return jwt.sign(payload, secret, options);

    } catch (err) {
        throw new ApiError("Failed to generate authentication token", HttpStatus.INTERNAL_SERVER_ERROR);
    }

} 

export const User = mongoose.model<IUserDocument, IUserModel>(
    "User", 
    UserSchema
);