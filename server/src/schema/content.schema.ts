import { z } from "zod";

export const createContentSchema = z.object({
    body: z.object({
        type: z.string().min(2, "Type is require"),
        title: z.string().min(1, "Title is required"),
        url: z.string().url("Invalid url"),
        text: z.string().optional(),
        tags: z.array(z.string()).optional(),
    }),
});


export const updateContentSchema = z.object({
    body: z.object({
        type: z.string().optional(),
        title: z.string().optional(),
        url: z.string().optional(),
        text: z.string().optional(),
        tags: z.array(z.string()).optional(),
    }),
});



export type CreateContentInput = z.infer<typeof createContentSchema>["body"];
export type UpdateContentInput = z.infer<typeof updateContentSchema>["body"];