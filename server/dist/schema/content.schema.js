"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContentSchema = exports.createContentSchema = void 0;
const zod_1 = require("zod");
exports.createContentSchema = zod_1.z.object({
    body: zod_1.z.object({
        type: zod_1.z.string().min(2, "Type is require"),
        title: zod_1.z.string().min(1, "Title is required"),
        url: zod_1.z.string().url("Invalid url"),
        text: zod_1.z.string().optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
exports.updateContentSchema = zod_1.z.object({
    body: zod_1.z.object({
        type: zod_1.z.string().optional(),
        title: zod_1.z.string().optional(),
        url: zod_1.z.string().optional(),
        text: zod_1.z.string().optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
