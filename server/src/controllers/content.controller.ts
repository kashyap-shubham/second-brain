import { Response, NextFunction } from "express";
import { IContentService } from "../services/content.service";
import { ResponseHandler } from "../utils/ResponseHandler";
import { AuthRequest } from "../middlewares/userAuth";
import { CreateContentInput, UpdateContentInput } from "../schema/content.schema";
import { JwtPayload } from "jsonwebtoken";

type TypedRequestBody<T> = AuthRequest & { body: T };

export class ContentController {
  private readonly contentService: IContentService;

  constructor(contentService: IContentService) {
    this.contentService = contentService;

    this.createContent = this.createContent.bind(this);
    this.getUserContent = this.getUserContent.bind(this);
    this.getContentById = this.getContentById.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.deleteContent = this.deleteContent.bind(this);
    this.searchContent = this.searchContent.bind(this);
    this.makeShareable = this.makeShareable.bind(this);
    this.getSharedContent = this.getSharedContent.bind(this);
  }

  // Create content
  public async createContent(req: TypedRequestBody<CreateContentInput>, res: Response, next: NextFunction) {
    try {
      const userId = this.extractUserId(req);
      const content = await this.contentService.createContent({ ...req.body, userId });
      ResponseHandler.success(res, 201, content, "Content created successfully");
    } catch (err) {
      next(err);
    }
  }

  // Get all content for a user
  public async getUserContent(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = this.extractUserId(req);
      const contents = await this.contentService.getContentByUser(userId);
      ResponseHandler.success(res, 200, contents, "Contents retrieved successfully");
    } catch (err) {
      next(err);
    }
  }

  public async getContentById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const content = await this.contentService.getContentById(req.params.id);
      ResponseHandler.success(res, 200, content, "Content retrieved successfully");
    } catch (err) {
      next(err);
    }
  }

  public async updateContent(req: TypedRequestBody<UpdateContentInput>, res: Response, next: NextFunction) {
    try {
      const content = await this.contentService.updateContent(req.params.id, req.body);
      ResponseHandler.success(res, 200, content, "Content updated successfully");
    } catch (err) {
      next(err);
    }
  }

  public async deleteContent(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await this.contentService.deleteContent(req.params.id);
      ResponseHandler.success(res, 200, null, "Content deleted successfully");
    } catch (err) {
      next(err);
    }
  }

  public async searchContent(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = this.extractUserId(req);
      const contents = await this.contentService.searchContent(userId, req.query.q as string);
      ResponseHandler.success(res, 200, contents, "Search results retrieved successfully");
    } catch (err) {
      next(err);
    }
  }

  public async makeShareable(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const content = await this.contentService.makeContentShareable(req.params.id);
      ResponseHandler.success(
        res,
        200,
        { shareId: content.shareId, url: `/share/${content.shareId}` },
        "Content is now shareable"
      );
    } catch (err) {
      next(err);
    }
  }

  public async getSharedContent(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const content = await this.contentService.getContentByShareId(req.params.shareId);
      ResponseHandler.success(res, 200, content, "Shared content retrieved successfully");
    } catch (err) {
      next(err);
    }
  }

  // Helper method to safely extract userId
  private extractUserId(req: AuthRequest): string {
    if (!req.user || typeof req.user === "string") {
      throw new Error("Invalid user payload");
    }
    const payload = req.user as JwtPayload & { id?: string };
    if (!payload.id) {
      throw new Error("User ID missing in token");
    }
    return payload.id;
  }
}
