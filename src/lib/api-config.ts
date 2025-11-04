/**
 * Configuração da API Backend
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

export const API_ENDPOINTS = {
  USER: {
    CREATE: '/user',
    GET_BY_EMAIL: (email: string) => `/user?email=${encodeURIComponent(email)}`,
    GET_ALL: '/user/all',
    UPDATE: (id: number) => `/user/${id}`,
    UPDATE_ROLE: (id: number, role: string) => `/user/${id}/role?role=${role}`,
    DELETE_BY_EMAIL: (email: string) => `/user?email=${encodeURIComponent(email)}`,
    DELETE_BY_ID: (id: number) => `/user/${id}`,
  },
} as const

