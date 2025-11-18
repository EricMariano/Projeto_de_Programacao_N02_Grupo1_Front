import { API_ENDPOINTS } from '@/lib/fetcher-config'
import { ApiError, fetcher } from '@/lib/fetcher'
import type { User } from '@/lib/interfaces'

export async function getAllUsers(): Promise<User[]> {
  return fetcher<User[]>({
    endpoint: API_ENDPOINTS.USER.GET_ALL,
    method: 'GET',
  })
}

export { ApiError }

