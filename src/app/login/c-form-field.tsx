"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { FieldGroup, Field, FieldLabel, FieldContent, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { login, ApiError } from "@/lib/api"
import { loginFormSchema, type LoginFormData } from "@/lib/validation-schemas"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
    mode: "onBlur",
  })

  const onSubmit = async (data: LoginFormData) => {
    setError(null)
    setSuccess(false)

    const loginData = {
      email: data.email,
      password: data.senha,
    }

    try {
      const response = await login(loginData)
      setSuccess(true)
      
      if (response.token) {
        // Exemplo: localStorage.setItem('token', response.token)
        console.log('Token recebido:', response.token)
      }
      
      setTimeout(() => {
        reset()
        setSuccess(false)
      }, 3000)
    } catch (err) {
      if (err instanceof ApiError) {
        let errorMsg = err.message || "Erro ao fazer login"
        
        if (err.details && typeof err.details === 'object') {
          const details = err.details as Record<string, unknown>
          if (details.errors && typeof details.errors === 'object') {
            const errorFields = Object.entries(details.errors as Record<string, unknown>)
              .map(([field, msg]) => `${field}: ${msg}`)
              .join(', ')
            errorMsg = `${err.message}. ${errorFields}`
          } else if (details.mensagem && typeof details.mensagem === 'string') {
            errorMsg = details.mensagem
          }
        }
        
        setError(errorMsg)
      } else {
        setError("Erro desconhecido ao fazer login. Tente novamente.")
      }
    }
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6 max-w-md mx-auto w-full", className)} 
      {...props}
    >
      <FieldGroup className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Faça seu login</h1>
          <p className="text-muted-foreground">
            Entre com suas credenciais para acessar o sistema
          </p>
        </div>

        <div className="space-y-4">
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <FieldContent>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              <FieldError errors={errors.email ? [errors.email] : undefined} />
            </FieldContent>
          </Field>

          <Field data-invalid={!!errors.senha}>
            <FieldLabel htmlFor="senha" className="flex items-center justify-between w-full">
              <span>Senha</span>
              <Link 
                href="/forgot-password" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-normal"
              >
                Esqueci minha senha
              </Link>
            </FieldLabel>
            <FieldContent>
              <Input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
                aria-invalid={!!errors.senha}
                {...register("senha")}
              />
              <FieldError errors={errors.senha ? [errors.senha] : undefined} />
            </FieldContent>
          </Field>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-900 dark:text-green-100">
              Login realizado com sucesso!
            </AlertDescription>
          </Alert>
        )}

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <Link 
              href="/register" 
              className="text-primary hover:underline font-medium"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </FieldGroup>
    </form>
  )
}

