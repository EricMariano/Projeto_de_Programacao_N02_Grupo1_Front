import { z } from "zod"

export const forgotPasswordFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email inválido")
    .toLowerCase(),
})

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>

