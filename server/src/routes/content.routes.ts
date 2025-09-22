import express from "express";
import { ContentController } from "../controllers/content.controller";
import { ContentService } from "../services/content.service";
import { userAuth } from "../middlewares/userAuth";
import { Validator } from "../middlewares/validator";
import { createContentSchema, updateContentSchema } from "../schema/content.schema";


const contentRouter = express.Router();
const contentService = new ContentService();
const contentController = new ContentController(contentService);


contentRouter.route("/share/:shareId").get(contentController.getSharedContent);


// Apply auth middleware for all other routes
contentRouter.use(userAuth

);

contentRouter
  .route("/")
  .post(Validator.validate(createContentSchema), contentController.createContent)
  .get(contentController.getUserContent);

  
contentRouter
  .route("/search")
  .get(contentController.searchContent);


contentRouter
  .route("/:id")
  .get(contentController.getContentById)
  .put(Validator.validate(updateContentSchema), contentController.updateContent)
  .delete(contentController.deleteContent);

contentRouter
  .route("/:id/share")
  .post(contentController.makeShareable);

export default contentRouter;
