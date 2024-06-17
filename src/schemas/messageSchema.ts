import { z } from "zod";

export const messageSchema = z.object({
    content : z
    .string()
    .min(3,{message : "Content must be alteast of 3 characters"})
    .max(300, {message: "message must be no longer than 300 characters"})
})
