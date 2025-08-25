import { userSchema } from "./userSchema";
import { z } from 'zod';

export const loginSchema = userSchema.omit({
    iduser: true,
    name: true,
    email: true,
    lastname: true,
    avatar_url: true,
    role: true,
    resetToken: true,
    resetTokenExpiry: true,
    createdAt: true,
    updatedAt: true
}).extend({
    password: z.string().min(1, "La contraseña es obligatoria"),
    username: z.string().min(1, "El nombre de usuario es obligatorio")
})
