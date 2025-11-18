import { API_ENDPOINTS } from '@/lib/fetcher-config'
import { ApiError, fetcher } from '@/lib/fetcher'

interface ResetPasswordPayload {
  token: string
  newPassword: string
}

export async function resetPassword(payload: ResetPasswordPayload): Promise<void> {
  return fetcher<void>({
    endpoint: '/auth/reset-password', 
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export { ApiError }