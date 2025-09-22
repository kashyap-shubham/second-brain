"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const content_controller_1 = require("../controllers/content.controller");
const content_service_1 = require("../services/content.service");
const userAuth_1 = require("../middlewares/userAuth");
const validator_1 = require("../middlewares/validator");
const content_schema_1 = require("../schema/content.schema");
const contentRouter = express_1.default.Router();
const contentService = new content_service_1.ContentService();
const contentController = new content_controller_1.ContentController(contentService);
contentRouter.route("/share/:shareId").get(contentController.getSharedContent);
// Apply auth middleware for all other routes
contentRouter.use(userAuth_1.userAuth);
contentRouter
    .route("/")
    .post(validator_1.Validator.validate(content_schema_1.createContentSchema), contentController.createContent)
    .get(contentController.getUserContent);
contentRouter
    .route("/search")
    .get(contentController.searchContent);
contentRouter
    .route("/:id")
    .get(contentController.getContentById)
    .put(validator_1.Validator.validate(content_schema_1.updateContentSchema), contentController.updateContent)
    .delete(contentController.deleteContent);
contentRouter
    .route("/:id/share")
    .post(contentController.makeShareable);
exports.default = contentRouter;
