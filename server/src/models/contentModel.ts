import mongoose, { Document, Schema, Model } from "mongoose";


export interface IContent {
  userId: mongoose.Types.ObjectId;
  type: string;     // e.g., "twitter", "blog", "fb"
  url: string;
  title: string;
  text?: string;
  tags: string[];
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
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

// Optional: full-text search
contentSchema.index({ title: "text", text: "text" });

export const Content: IContentModel = mongoose.model<IContentDocument, IContentModel>(
  "Content",
  contentSchema
);
