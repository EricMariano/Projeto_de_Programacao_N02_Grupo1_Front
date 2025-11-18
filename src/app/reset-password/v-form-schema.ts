import { z } from "zod"

export const resetPasswordFormSchema = z.object({
  password: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .max(50, "A senha deve ter no máximo 50 caracteres"),
  confirmPassword: z
    .string()
    .min(8, "Confirmação de senha obrigatória"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
})

export type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>