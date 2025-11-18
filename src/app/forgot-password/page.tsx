"use client"

import { ForgotPasswordForm } from "./c-form-field"
import { Header } from "@/components/globals/header"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Recuperação de Senha - Grupo 01" />

      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <ForgotPasswordForm />
        </div>
      </div>

      <div className="border-t border-border/50 py-4 text-center">
        <p className="text-xs text-muted-foreground">
          © 2025 Grupo 01 - N02. Sistema de Cadastro de Usuários.
        </p>
      </div>
    </div>
  )
}

