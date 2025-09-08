import mongoose, { mongo } from "mongoose";


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
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },

    tags: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});


const Content = mongoose.model("content", ContentSchema);