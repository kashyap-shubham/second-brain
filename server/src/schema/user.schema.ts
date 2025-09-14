import z from "zod";

// signup schema 
export const signupSchema = z.object({
    body: z.object({
        userName: z.string().min(3, "UserName must be atleast 3 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be atleast 6 characters long"),
    }),
});


// signin schema
export const signinSchema = z.object({
    body: z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be atleast 6 character long"),
    }),
});


// inferred types
export type SignupInput = z.infer<typeof signupSchema>["body"];
export type SigninInput = z.infer<typeof signinSchema>["body"];