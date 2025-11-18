import { ApiError } from "./actions"
import type { ForgotPasswordFormData } from "./v-form-schema"
import type { ForgotPasswordRequestDTO } from "@/lib/interfaces"

export const defaultFormValues: Partial<ForgotPasswordFormData> = {
  email: "",
}

export const RESET_FORM_DELAY_MS = 5000

export function transformFormDataToRequestDTO(
  data: ForgotPasswordFormData
): ForgotPasswordRequestDTO {
  return {
    email: data.email,
  }
}

export function extractApiErrorMessage(
  error: unknown,
  defaultMessage: string = "Erro desconhecido ao solicitar recuperação de senha. Tente novamente."
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

