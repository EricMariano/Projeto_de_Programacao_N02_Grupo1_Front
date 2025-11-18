import { z } from "zod"

// Validação de CPF (desabilitada por enquanto)
// const validateCPF = (cpf: string): boolean => {
//   if (!cpf || cpf.length !== 11) return false
//   
//   if (/^(\d)\1{10}$/.test(cpf)) return false
//   
//   let sum = 0
//   for (let i = 0; i < 9; i++) {
//     sum += parseInt(cpf.charAt(i)) * (10 - i)
//   }
//   let digit = 11 - (sum % 11)
//   if (digit >= 10) digit = 0
//   if (digit !== parseInt(cpf.charAt(9))) return false
//   
//   sum = 0
//   for (let i = 0; i < 10; i++) {
//     sum += parseInt(cpf.charAt(i)) * (11 - i)
//   }
//   digit = 11 - (sum % 11)
//   if (digit >= 10) digit = 0
//   if (digit !== parseInt(cpf.charAt(10))) return false
//   
//   return true
// }

export const registerFormSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter no mínimo 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras e espaços"),
  
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email inválido")
    .toLowerCase(),
  
  cpf: z
    .string()
    .min(11, "CPF deve ter 11 dígitos")
    .max(11, "CPF deve ter 11 dígitos")
    .regex(/^\d{11}$/, "CPF deve conter apenas números"),
    // .refine(validateCPF, "CPF inválido"), // Validação algorítmica desabilitada por enquanto
  
  telefone: z
    .string()
    .min(10, "Telefone deve ter no mínimo 10 dígitos (DDD + número)")
    .max(11, "Telefone deve ter no máximo 11 dígitos")
    .regex(/^\d{10,11}$/, "Telefone deve conter apenas números"),
  
  senha: z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .max(50, "Senha deve ter no máximo 50 caracteres"),
  
  dataNascimento: z
    .date({
      message: "Data de nascimento é obrigatória",
    })
    .refine((date) => {
      const today = new Date()
      const age = today.getFullYear() - date.getFullYear()
      return age >= 14 && age <= 120
    }, "Idade deve estar entre 14 e 120 anos"),
  
  matricula: z
    .string()
    .min(1, "Matrícula é obrigatória")
    .max(50, "Matrícula deve ter no máximo 50 caracteres"),
  
  registroProf: z
    .string()
    .max(50, "Registro profissional deve ter no máximo 50 caracteres")
    .optional()
    .or(z.literal("")),
  
  especialidade: z
    .string()
    .max(100, "Especialidade deve ter no máximo 100 caracteres")
    .optional()
    .or(z.literal("")),
  
  nivelAcesso: z
    .enum(["STUDENT", "INSTRUCTOR", "ADMIN"], {
      message: "Nível de acesso é obrigatório",
    }),
})

export type RegisterFormData = z.infer<typeof registerFormSchema>

