"use client"

import { RegisterForm } from "./c-form-field"
import { Header } from "@/components/globals/header"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Cadastro de Usuários - Grupo 01" />

      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-3xl">
          <RegisterForm />
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
