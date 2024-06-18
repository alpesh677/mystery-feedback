import {z} from "zod"

export const emailSchema = z.object({
    email : z.string().email("Email is not valid")
})