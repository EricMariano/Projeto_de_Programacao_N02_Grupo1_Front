import { API_ENDPOINTS } from '@/lib/fetcher-config'
import { ApiError, fetcher } from '@/lib/fetcher'
import type { LoginRequestDTO, LoginResponseDTO, User } from '@/lib/interfaces'

export async function login(loginData: LoginRequestDTO): Promise<LoginResponseDTO> {
  return fetcher<LoginResponseDTO>({
    endpoint: API_ENDPOINTS.USER.LOGIN,
    method: 'POST',
    body: JSON.stringify(loginData),
  })
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const users = await fetcher<User[]>({
      endpoint: API_ENDPOINTS.USER.GET_ALL,
      method: 'GET',
    })
    return users.find(user => user.email === email) || null
  } catch {
    return null
  }
}

export { ApiError }
