"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { FieldGroup, Field, FieldLabel, FieldContent, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { resetPassword, ApiError } from "./actions"
import { resetPasswordFormSchema, type ResetPasswordFormData } from "./v-form-schema"
import { AlertCircle, CheckCircle2, ArrowLeft, Lock } from "lucide-react"

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const token = searchParams.get("token")

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordFormSchema),
    mode: "onBlur",
  })

  useEffect(() => {
    if (!token) {
      setError("Token de recuperação inválido ou ausente.")
    }
  }, [token])

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      setError("Token inválido.")
      return
    }

    setError(null)
    setSuccess(false)

    try {
      await resetPassword({
        token: token,
        newPassword: data.password
      })
      
      setSuccess(true)

      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message || "Erro ao redefinir senha.")
      } else {
        setError("Ocorreu um erro inesperado. Tente novamente.")
      }
    }
  }

  if (!token) {
     return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Link de recuperação inválido. Solicite uma nova redefinição.</AlertDescription>
        </Alert>
     )
  }

  if (success) {
    return (
      <div className="flex flex-col gap-6 max-w-md mx-auto w-full text-center">
        <Alert className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-900 dark:text-green-100">
            Senha alterada com sucesso! Você será redirecionado para o login.
          </AlertDescription>
        </Alert>
        <Button asChild className="w-full">
          <Link href="/login">Ir para Login agora</Link>
        </Button>
      </div>
    )
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6 max-w-md mx-auto w-full", className)} 
      {...props}
    >
      <FieldGroup className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Redefinir Senha</h1>
          <p className="text-muted-foreground">
            Crie uma nova senha segura para sua conta
          </p>
        </div>

        <div className="space-y-4">
          <Field data-invalid={!!errors.password}>
            <FieldLabel htmlFor="password">Nova Senha</FieldLabel>
            <FieldContent>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  className="pl-9"
                  placeholder="Mínimo 8 caracteres"
                  {...register("password")}
                />
              </div>
              <FieldError errors={errors.password ? [errors.password] : undefined} />
            </FieldContent>
          </Field>

          <Field data-invalid={!!errors.confirmPassword}>
            <FieldLabel htmlFor="confirmPassword">Confirmar Nova Senha</FieldLabel>
            <FieldContent>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  className="pl-9"
                  placeholder="Repita a senha"
                  {...register("confirmPassword")}
                />
              </div>
              <FieldError errors={errors.confirmPassword ? [errors.confirmPassword] : undefined} />
            </FieldContent>
          </Field>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Salvando..." : "Alterar Senha"}
        </Button>

        <div className="text-center">
          <Link 
            href="/login" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Cancelar e voltar ao login
          </Link>
        </div>
      </FieldGroup>
    </form>
  )
}