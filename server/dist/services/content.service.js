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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentService = void 0;
const content_model_1 = require("../models/content.model");
const apiError_1 = require("../utils/apiError");
const httpStatus_1 = require("../constants/httpStatus");
const mongoose_1 = __importDefault(require("mongoose"));
const uuid_1 = require("uuid");
class ContentService {
    createContent(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = new content_model_1.Content(Object.assign(Object.assign({}, data), { userId: new mongoose_1.default.Types.ObjectId(data.userId) }));
            yield content.save();
            return content;
        });
    }
    getContentByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return content_model_1.Content.find({ userId }).sort({ createdAt: -1 });
        });
    }
    getContentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = yield content_model_1.Content.findById(id);
            if (!content)
                throw new apiError_1.ApiError("Content not found", httpStatus_1.HttpStatus.NOT_FOUND);
            return content;
        });
    }
    updateContent(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = yield content_model_1.Content.findByIdAndUpdate(id, data, { new: true });
            if (!content)
                throw new apiError_1.ApiError("Content not found", httpStatus_1.HttpStatus.NOT_FOUND);
            return content;
        });
    }
    deleteContent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield content_model_1.Content.findByIdAndDelete(id);
            if (!deleted)
                throw new apiError_1.ApiError("Content not found", httpStatus_1.HttpStatus.NOT_FOUND);
        });
    }
    searchContent(userId, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return content_model_1.Content.find({
                userId,
                $text: { $search: query },
            }).sort({ createdAt: -1 });
        });
    }
    makeContentShareable(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = yield content_model_1.Content.findById(id);
            if (!content)
                throw new apiError_1.ApiError("Content not found", httpStatus_1.HttpStatus.NOT_FOUND);
            content.isShared = true;
            if (!content.shareId)
                content.shareId = (0, uuid_1.v4)();
            yield content.save();
            return content;
        });
    }
    getContentByShareId(shareId) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = yield content_model_1.Content.findOne({ shareId, isShared: true });
            if (!content)
                throw new apiError_1.ApiError("Shared content not found", httpStatus_1.HttpStatus.NOT_FOUND);
            return content;
        });
    }
}
exports.ContentService = ContentService;
