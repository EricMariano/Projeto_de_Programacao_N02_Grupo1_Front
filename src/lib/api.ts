import { API_BASE_URL, API_ENDPOINTS } from './api-config'

/**
 * Tipos TypeScript baseados na documentação da API
 */

export type UserRole = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN'

export interface User {
  id: number
  name: string
  email: string
  cpf: string
  password?: string // Geralmente não vem na resposta por segurança
  phone: string
  birthDate: string // formato: "YYYY-MM-DD"
  registrationDate: string // formato: "YYYY-MM-DDTHH:mm:ss"
  lastAccess: string // formato: "YYYY-MM-DDTHH:mm:ss"
  registration: string
  specialty: string | null
  teacherRegistration: string | null
  role: UserRole
}

export interface UserRequestDTO {
  name: string
  email: string
  cpf?: string
  password: string
  phone: string
  specialty?: string | null
  birthDate: string // formato: "YYYY-MM-DD"
  role?: UserRole // Se não informado, default é "STUDENT"
  registration?: string
  teacherRegistration?: string | null
}

/**
 * Classe de erro customizada para erros da API
 */
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

/**
 * Função auxiliar para fazer requisições fetch com tratamento de erros
 */
async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      let errorMessage = `Erro ${response.status}: ${response.statusText}`
      
      // Tenta ler mensagem de erro do corpo da resposta
      try {
        const errorData = await response.json()
        if (errorData.message) {
          errorMessage = errorData.message
        } else if (typeof errorData === 'string') {
          errorMessage = errorData
        }
      } catch {
        // Se não conseguir ler JSON, usa a mensagem padrão
      }

      throw new ApiError(errorMessage, response.status)
    }

    // Se a resposta não tiver conteúdo, retorna void
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return await response.json()
    }

    // Para respostas vazias (status 200 sem corpo)
    return undefined as T
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    
    // Erros de rede ou outros erros
    throw new ApiError(
      error instanceof Error ? error.message : 'Erro desconhecido na requisição',
      0
    )
  }
}

/**
 * API Service - Funções para interagir com o backend
 */
export const api = {
  /**
   * Criar novo usuário
   */
  async createUser(userData: UserRequestDTO): Promise<void> {
    return fetchApi<void>(API_ENDPOINTS.USER.CREATE, {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  },

  /**
   * Buscar usuário por email
   */
  async getUserByEmail(email: string): Promise<User> {
    return fetchApi<User>(API_ENDPOINTS.USER.GET_BY_EMAIL(email), {
      method: 'GET',
    })
  },

  /**
   * Listar todos os usuários
   */
  async getAllUsers(): Promise<User[]> {
    return fetchApi<User[]>(API_ENDPOINTS.USER.GET_ALL, {
      method: 'GET',
    })
  },

  /**
   * Atualizar usuário completo
   */
  async updateUser(id: number, userData: UserRequestDTO): Promise<void> {
    return fetchApi<void>(API_ENDPOINTS.USER.UPDATE(id), {
      method: 'PUT',
      body: JSON.stringify(userData),
    })
  },

  /**
   * Atualizar apenas a role do usuário
   */
  async updateUserRole(id: number, role: UserRole): Promise<void> {
    return fetchApi<void>(API_ENDPOINTS.USER.UPDATE_ROLE(id, role), {
      method: 'PATCH',
    })
  },

  /**
   * Deletar usuário por email
   */
  async deleteUserByEmail(email: string): Promise<void> {
    return fetchApi<void>(API_ENDPOINTS.USER.DELETE_BY_EMAIL(email), {
      method: 'DELETE',
    })
  },

  /**
   * Deletar usuário por ID
   */
  async deleteUserById(id: number): Promise<void> {
    return fetchApi<void>(API_ENDPOINTS.USER.DELETE_BY_ID(id), {
      method: 'DELETE',
    })
  },
}

