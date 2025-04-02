import { z } from "zod";

export const SignUpInput = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().min(10).max(10),
    password: z.string().min(6)
})

export const SignInInput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})
