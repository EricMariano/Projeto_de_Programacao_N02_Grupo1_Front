"use client"

import { Suspense } from "react"
import { ResetPasswordForm } from "./c-reset-form"
import { Header } from "@/components/globals/header"
import { Loader2 } from "lucide-react"

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Redefinição de Senha - Grupo 01" />

      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <Suspense fallback={
            <div className="flex justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          }>
            <ResetPasswordForm />
          </Suspense>
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