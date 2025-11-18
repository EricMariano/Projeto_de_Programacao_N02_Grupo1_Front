"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { FieldGroup, Field, FieldLabel, FieldContent, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { forgotPassword } from "./actions"
import { forgotPasswordFormSchema, type ForgotPasswordFormData } from "./v-form-schema"
import { AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react"
import {
  defaultFormValues,
  transformFormDataToRequestDTO,
  extractApiErrorMessage,
  RESET_FORM_DELAY_MS,
} from "./helpers"

export function ForgotPasswordForm({
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
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: defaultFormValues,
    mode: "onBlur",
  })

  const resetForm = () => {
    reset()
    setSuccess(false)
  }

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setError(null)
    setSuccess(false)

    try {
      const forgotPasswordData = transformFormDataToRequestDTO(data)
      await forgotPassword(forgotPasswordData)
      setSuccess(true)

      setTimeout(() => {
        resetForm()
      }, RESET_FORM_DELAY_MS)
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
          <h1 className="text-2xl font-bold">Esqueci minha senha</h1>
          <p className="text-muted-foreground">
            Digite seu email para receber instruções de recuperação de senha
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
              Instruções de recuperação de senha foram enviadas para seu email. Verifique sua caixa de entrada.
            </AlertDescription>
          </Alert>
        )}

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Enviando..." : "Enviar instruções"}
        </Button>

        <div className="text-center">
          <Link 
            href="/login" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para o login
          </Link>
        </div>
      </FieldGroup>
    </form>
  )
}

