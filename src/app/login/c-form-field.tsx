"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { FieldGroup, Field, FieldLabel, FieldContent, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { login } from "./actions"
import { loginFormSchema, type LoginFormData } from "./v-form-schema"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import Link from "next/link"
import {
  defaultFormValues,
  transformFormDataToLoginDTO,
  extractApiErrorMessage,
  checkAndHandleAdminRedirect,
} from "./helpers"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: defaultFormValues,
    mode: "onBlur",
  })

  const onSubmit = async (data: LoginFormData) => {
    setError(null)
    setSuccess(false)
    setIsRedirecting(false)

    try {
      const loginData = transformFormDataToLoginDTO(data)
      const response = await login(loginData)
      setSuccess(true)

      await checkAndHandleAdminRedirect(response, setIsRedirecting, router.push)
    } catch (err) {
      setError(extractApiErrorMessage(err))
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
              {isRedirecting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Redirecionando para o painel administrativo...</span>
                </div>
              ) : (
                "Login realizado com sucesso!"
              )}
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

