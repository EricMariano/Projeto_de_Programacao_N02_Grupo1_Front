export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

export const API_ENDPOINTS = {
  USER: {
    CREATE: '/user',
    GET_ALL: '/user/all',
    LOGIN: '/auth/login',
    FORGOT_PASSWORD: '/auth/forgot-password',
  },
} as const
