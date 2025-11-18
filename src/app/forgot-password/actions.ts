import { API_ENDPOINTS } from '@/lib/fetcher-config'
import { ApiError, fetcher } from '@/lib/fetcher'
import type { ForgotPasswordRequestDTO, ForgotPasswordResponseDTO } from '@/lib/interfaces'

export async function forgotPassword(forgotPasswordData: ForgotPasswordRequestDTO): Promise<ForgotPasswordResponseDTO> {
  return fetcher<ForgotPasswordResponseDTO>({
    endpoint: API_ENDPOINTS.USER.FORGOT_PASSWORD,
    method: 'POST',
    body: JSON.stringify(forgotPasswordData),
  })
}

export { ApiError }

