import mongoose, {Document, Schema} from "mongoose";
import { isContext } from "vm";


export interface IContent {
    userId: string;
    url: string;
    title: string;
    text: string;
    createAt: Date;
}


export type IContentDocument = IContent & Document;

const UserSchema: IContentDocument = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }

})


const User = mongoose.model("user", UserSchema);