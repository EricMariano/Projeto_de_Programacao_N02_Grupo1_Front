import { API_ENDPOINTS } from '@/lib/fetcher-config'
import { ApiError, fetcher } from '@/lib/fetcher'
import type { UserRequestDTO } from '@/lib/interfaces'

export async function createUser(userData: UserRequestDTO): Promise<void> {
  return fetcher<void>({
    endpoint: API_ENDPOINTS.USER.CREATE,
    method: 'POST',
    body: JSON.stringify(userData),
  })
}

export { ApiError }

