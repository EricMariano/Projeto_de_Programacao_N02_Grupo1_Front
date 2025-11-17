export type UserRole = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN'

export interface User {
  id: number
  name: string
  email: string
  cpf: string
  phone: string
  birthDate: string
  registrationDate: string
  lastAccess: string
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
  birthDate: string
  role?: UserRole
  registration?: string
  teacherRegistration?: string | null
}

export interface LoginRequestDTO {
  email: string
  password: string
}

export interface LoginResponseDTO {
  token?: string
  user?: User
  message?: string
}

export interface ForgotPasswordRequestDTO {
  email: string
}

export interface ForgotPasswordResponseDTO {
  message?: string
  success?: boolean
}

