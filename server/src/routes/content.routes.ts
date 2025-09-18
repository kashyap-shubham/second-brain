import express from "express";
import { ContentController } from "../controllers/content.controller";
import { ContentService } from "../services/content.service";
import { Validator } from "../middlewares/validator.middleware";
import { createContentSchema, updateContentSchema } from "../schemas/content.schema";
import { userAuth } from "../middlewares/userAuth.middleware";

const contentRouter = express.Router();
const contentService = new ContentService();
const contentController = new ContentController(contentService);

// All routes are protected except shared content
contentRouter.use(userAuth);

contentRouter.post("/", Validator.validate(createContentSchema), contentController.createContent);
contentRouter.get("/", contentController.getUserContent);
contentRouter.get("/:id", contentController.getContentById);
contentRouter.put("/:id", Validator.validate(updateContentSchema), contentController.updateContent);
contentRouter.delete("/:id", contentController.deleteContent);
contentRouter.get("/search", contentController.searchContent);

// Shareable link endpoints
contentRouter.post("/:id/share", contentController.makeShareable);
contentRouter.get("/share/:shareId", contentController.getSharedContent); // public

export default contentRouter;
