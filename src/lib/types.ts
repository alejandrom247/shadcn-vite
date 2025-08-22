import type { loginSchema } from "@/schema/loginSchema";
import type { userSchema } from "@/schema/userSchema";
import type z from "zod";

export type Login = z.infer<typeof loginSchema>

export type User = z.infer<typeof userSchema>