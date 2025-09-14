import { Content, IContentDocument } from "../models/content.model";
import { ApiError } from "../utils/apiError";
import { HttpStatus } from "../constants/httpStatus";
import mongoose from "mongoose";

// Input DTOs
interface CreateContentDTO {
  userId: string;
  type: string;
  title: string;
  url: string;
  text?: string;
  tags?: string[];
}

interface UpdateContentDTO {
  type?: string;
  title?: string;
  url?: string;
  text?: string;
  tags?: string[];
}

// Service interface
export interface IContentService {
  createContent(data: CreateContentDTO): Promise<IContentDocument>;
  getContentByUser(userId: string): Promise<IContentDocument[]>;
  getContentById(id: string): Promise<IContentDocument>;
  updateContent(id: string, data: UpdateContentDTO): Promise<IContentDocument>;
  deleteContent(id: string): Promise<void>;
  searchContent(userId: string, query: string): Promise<IContentDocument[]>;
}

// Implementation
export class ContentService implements IContentService {
  public async createContent(data: CreateContentDTO): Promise<IContentDocument> {
    const content = new Content({
      ...data,
      userId: new mongoose.Types.ObjectId(data.userId),
    });
    await content.save();
    return content;
  }

  public async getContentByUser(userId: string): Promise<IContentDocument[]> {
    return Content.find({ userId }).sort({ createdAt: -1 });
  }

  public async getContentById(id: string): Promise<IContentDocument> {
    const content = await Content.findById(id);
    if (!content) {
      throw new ApiError("Content not found", HttpStatus.NOT_FOUND);
    }
    return content;
  }

  public async updateContent(id: string, data: UpdateContentDTO): Promise<IContentDocument> {
    const content = await Content.findByIdAndUpdate(id, data, { new: true });
    if (!content) {
      throw new ApiError("Content not found", HttpStatus.NOT_FOUND);
    }
    return content;
  }

  public async deleteContent(id: string): Promise<void> {
    const deleted = await Content.findByIdAndDelete(id);
    if (!deleted) {
      throw new ApiError("Content not found", HttpStatus.NOT_FOUND);
    }
  }

  public async searchContent(userId: string, query: string): Promise<IContentDocument[]> {
    return Content.find({
      userId,
      $text: { $search: query },
    }).sort({ createdAt: -1 });
  }
}
