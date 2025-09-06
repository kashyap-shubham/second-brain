import mongoose from "mongoose";


const ContentSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    
    type: {
        type: String,
    },
    
    url: {
        type: String,
    },
    
    creator: {
        type: String,
    }
}, {
    timestamps: true
});


const Content = mongoose.model("content", ContentSchema);