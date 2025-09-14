import { Response, NextFunction } from "express";
import { IContentService } from "../services/content.service";
import { TypedRequestBody } from "./user.controller"; // reuse typed request
import { CreateContentInput, UpdateContentInput } from "../schemas/content.schema";
import { ResponseHandler } from "../utils/ResponseHandler";

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
  }

  public async createContent(
    req: TypedRequestBody<CreateContentInput>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = (req as any).user?.id; // from JWT
      const content = await this.contentService.createContent({ ...req.body, userId });
      ResponseHandler.success(res, 201, content, "Content created successfully");
    } catch (err) {
      next(err);
    }
  }

  public async getUserContent(req: any, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const contents = await this.contentService.getContentByUser(userId);
      ResponseHandler.success(res, 200, contents, "Contents retrieved successfully");
    } catch (err) {
      next(err);
    }
  }

  public async getContentById(req: any, res: Response, next: NextFunction) {
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

  public async deleteContent(req: any, res: Response, next: NextFunction) {
    try {
      await this.contentService.deleteContent(req.params.id);
      ResponseHandler.success(res, 200, null, "Content deleted successfully");
    } catch (err) {
      next(err);
    }
  }

  public async searchContent(req: any, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const contents = await this.contentService.searchContent(userId, req.query.q as string);
      ResponseHandler.success(res, 200, contents, "Search results retrieved successfully");
    } catch (err) {
      next(err);
    }
  }
}
