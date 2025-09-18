import mongoose, { Document, Schema, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IContent {
  userId: mongoose.Schema.Types.ObjectId;
  type: string;     // e.g., "twitter", "blog", "fb"
  url: string;
  title: string;
  text?: string;
  tags: string[];
  shareId?: string;
  isShared?: boolean;
  createdAt: Date;
  updatedAt: Date;
}


export type IContentDocument = IContent & Document;


export type IContentModel = Model<IContentDocument>;


const contentSchema = new Schema<IContentDocument>(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    url: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String },
    tags: { type: [String], default: [] },
    shareId: { type: String, unique: true, sparse: true }, 
    isShared: { type: Boolean, default: false },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);


// Generate shareId automatically if content is shared
contentSchema.pre("save", function (next) {
  const content = this as IContentDocument;
  if (content.isShared && !content.shareId) {
    content.shareId = uuidv4();
  }
  next();
});

// Optional: full-text search
contentSchema.index({ title: "text", text: "text" });

export const Content: IContentModel = mongoose.model<IContentDocument, IContentModel>(
  "Content",
  contentSchema
);