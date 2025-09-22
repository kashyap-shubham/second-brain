"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentController = void 0;
const ResponseHandler_1 = require("../utils/ResponseHandler");
class ContentController {
    constructor(contentService) {
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
    createContent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = this.extractUserId(req);
                const content = yield this.contentService.createContent(Object.assign(Object.assign({}, req.body), { userId }));
                ResponseHandler_1.ResponseHandler.success(res, 201, content, "Content created successfully");
            }
            catch (err) {
                next(err);
            }
        });
    }
    // Get all content for a user
    getUserContent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = this.extractUserId(req);
                const contents = yield this.contentService.getContentByUser(userId);
                ResponseHandler_1.ResponseHandler.success(res, 200, contents, "Contents retrieved successfully");
            }
            catch (err) {
                next(err);
            }
        });
    }
    getContentById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const content = yield this.contentService.getContentById(req.params.id);
                ResponseHandler_1.ResponseHandler.success(res, 200, content, "Content retrieved successfully");
            }
            catch (err) {
                next(err);
            }
        });
    }
    updateContent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const content = yield this.contentService.updateContent(req.params.id, req.body);
                ResponseHandler_1.ResponseHandler.success(res, 200, content, "Content updated successfully");
            }
            catch (err) {
                next(err);
            }
        });
    }
    deleteContent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.contentService.deleteContent(req.params.id);
                ResponseHandler_1.ResponseHandler.success(res, 200, null, "Content deleted successfully");
            }
            catch (err) {
                next(err);
            }
        });
    }
    searchContent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = this.extractUserId(req);
                const contents = yield this.contentService.searchContent(userId, req.query.q);
                ResponseHandler_1.ResponseHandler.success(res, 200, contents, "Search results retrieved successfully");
            }
            catch (err) {
                next(err);
            }
        });
    }
    makeShareable(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const content = yield this.contentService.makeContentShareable(req.params.id);
                ResponseHandler_1.ResponseHandler.success(res, 200, { shareId: content.shareId, url: `/share/${content.shareId}` }, "Content is now shareable");
            }
            catch (err) {
                next(err);
            }
        });
    }
    getSharedContent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const content = yield this.contentService.getContentByShareId(req.params.shareId);
                ResponseHandler_1.ResponseHandler.success(res, 200, content, "Shared content retrieved successfully");
            }
            catch (err) {
                next(err);
            }
        });
    }
    // Helper method to safely extract userId
    extractUserId(req) {
        if (!req.user || typeof req.user === "string") {
            throw new Error("Invalid user payload");
        }
        const payload = req.user;
        if (!payload.id) {
            throw new Error("User ID missing in token");
        }
        return payload.id;
    }
}
exports.ContentController = ContentController;
