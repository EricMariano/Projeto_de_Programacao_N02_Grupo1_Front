
import { format } from "date-fns"
import { ApiError } from "../register/actions"
import type { UserRequestDTO } from "@/lib/interfaces"
import type { RegisterFormData } from "../register/v-form-schema"

export const defaultFormValues: Partial<RegisterFormData> = {
  nome: "",
  email: "",
  cpf: "",
  telefone: "",
  senha: "",
  dataNascimento: undefined,
  matricula: "",
  registroProf: "",
  especialidade: "",
  nivelAcesso: undefined,
}

export function getFieldsToValidateByStep(step: number): (keyof RegisterFormData)[] {
  if (step === 1) {
    return ["nome", "email", "cpf", "telefone", "senha", "dataNascimento"]
  }
  if (step === 2) {
    return ["matricula", "nivelAcesso"]
  }
  return []
}

export function transformFormDataToUserDTO(data: RegisterFormData): UserRequestDTO {
  return {
    name: data.nome,
    email: data.email,
    cpf: data.cpf,
    password: data.senha,
    phone: data.telefone,
    birthDate: format(data.dataNascimento, "yyyy-MM-dd"),
    role: data.nivelAcesso,
    registration: data.matricula,
    teacherRegistration: data.registroProf || null,
    specialty: data.especialidade || null,
  }
}

export function extractApiErrorMessage(
  error: unknown,
  defaultMessage: string = "Erro desconhecido. Tente novamente."
): string {
  if (!(error instanceof ApiError)) {
    return defaultMessage
  }

  let errorMessage = error.message || defaultMessage

  if (error.details && typeof error.details === "object") {
    const details = error.details as Record<string, unknown>
    
    if (details.errors && typeof details.errors === "object") {
      const errorFields = Object.entries(
        details.errors as Record<string, unknown>
      )
        .map(([field, msg]) => `${field}: ${msg}`)
        .join(", ")
      errorMessage = `${error.message}. ${errorFields}`
    } else if (details.mensagem && typeof details.mensagem === "string") {
      errorMessage = details.mensagem
    }
  }

  return errorMessage
}

