import { ApiError, getUserByEmail } from "./actions"
import type { LoginFormData } from "./v-form-schema"
import type { LoginRequestDTO, LoginResponseDTO, User } from "@/lib/interfaces"

export const defaultFormValues: Partial<LoginFormData> = {
  email: "",
  senha: "",
}

export const REDIRECT_DELAY_MS = 1500
export const ADMIN_REDIRECT_PATH = "/admin"

export function transformFormDataToLoginDTO(data: LoginFormData): LoginRequestDTO {
  return {
    email: data.email,
    password: data.senha,
  }
}

export function extractEmailFromToken(token: string): string | null {
  try {
    const tokenParts = token.split(".")
    if (tokenParts.length !== 3) {
      return null
    }

    const payload = JSON.parse(atob(tokenParts[1]))
    return payload.sub || null
  } catch {
    return null
  }
}

export function isAdminUser(user: User | null): boolean {
  if (!user) {
    return false
  }

  return user.role === "ADMIN" || user.role?.toUpperCase() === "ADMIN"
}

export async function checkAndHandleAdminRedirect(
  response: LoginResponseDTO,
  setIsRedirecting: (value: boolean) => void,
  redirect: (path: string) => void
): Promise<void> {
  if (!response.token) {
    return
  }

  localStorage.setItem("token", response.token)

  try {
    const userEmail = extractEmailFromToken(response.token)

    if (userEmail) {
      const user = await getUserByEmail(userEmail)

      if (isAdminUser(user)) {
        setIsRedirecting(true)
        setTimeout(() => {
          redirect(ADMIN_REDIRECT_PATH)
        }, REDIRECT_DELAY_MS)
        return
      }
    }
  } catch {
    if (response.user && isAdminUser(response.user)) {
      setIsRedirecting(true)
      setTimeout(() => {
        redirect(ADMIN_REDIRECT_PATH)
      }, REDIRECT_DELAY_MS)
    }
  }
}

export function extractApiErrorMessage(
  error: unknown,
  defaultMessage: string = "Erro desconhecido ao fazer login. Tente novamente."
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

