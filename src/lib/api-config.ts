// Use Next.js API routes as proxy to avoid CORS issues
export const API_BASE_URL = ''

export const API_ENDPOINTS = {
  USER: {
    CREATE: '/api/user',
    LOGIN: '/api/auth/login',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
  },
} as const
