"use client"

import { GalleryVerticalEnd } from "lucide-react"
import { ForgotPasswordForm } from "./c-form-field"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container flex h-16 items-center px-4 md:px-8">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg shadow-sm">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <span className="hidden sm:inline">Recuperação de Senha - Grupo 01</span>
            <span className="sm:hidden">Grupo 01</span>
          </div>
        </div>
      </div>

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

