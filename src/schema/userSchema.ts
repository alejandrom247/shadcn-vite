import { z } from 'zod'

export const userSchema = z.object({
    iduser:z.uuid(),
    name:z.string(),
    lastname:z.string(),
    email:z.email(),
    avatar_url:z.string().nullable(),
    username: z.string(),
    role: z.string(),
    resetToken: z.string().nullable(),
    resetTokenExpiry: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string()
})