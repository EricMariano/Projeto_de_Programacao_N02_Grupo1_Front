import { API_BASE_URL, API_ENDPOINTS } from './api-config'
import type { UserRequestDTO } from './types'

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

interface FetchOptions extends RequestInit {
  endpoint: string
}

async function fetcher<T>(options: FetchOptions): Promise<T> {
  const { endpoint, ...requestInit } = options
  const url = `${API_BASE_URL}${endpoint}`

  const config: RequestInit = {
    ...requestInit,
    headers: {
      'Content-Type': 'application/json',
      ...requestInit.headers,
    },
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      let errorMessage = `Erro ${response.status}: ${response.statusText}`
      let errorDetails = undefined

      try {
        const errorData = await response.json()

        if (errorData.mensagem) {
          errorMessage = errorData.mensagem
        } else if (errorData.message) {
          errorMessage = errorData.message
        } else if (typeof errorData === 'string') {
          errorMessage = errorData
        }
        errorDetails = errorData
      } catch {
      }

      throw new ApiError(errorMessage, response.status, errorDetails)
    }

    const contentType = response.headers.get('content-type')
    if (contentType?.includes('application/json')) {
      return await response.json()
    }

    return undefined as T
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }

    throw new ApiError(
      error instanceof Error ? error.message : 'Erro desconhecido na requisição',
      0
    )
  }
}

export const createUser = async (userData: UserRequestDTO): Promise<void> => {
  return fetcher<void>({
    endpoint: API_ENDPOINTS.USER.CREATE,
    method: 'POST',
    body: JSON.stringify(userData),
  })
}
