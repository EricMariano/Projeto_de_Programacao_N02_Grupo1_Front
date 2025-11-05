"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { FieldGroup } from "@/components/ui/field"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Stepper, type Step } from "./components/stepper"
import { FormHeader } from "./components/form-header"
import { BasicInfoStep } from "./components/basic-info-step"
import { ProfessionalInfoStep } from "./components/professional-info-step"
import { ReviewStep } from "./components/review-step"
import { FormNavigation } from "./components/form-navigation"
import { createUser, ApiError } from "@/lib/api"
import type { UserRequestDTO } from "@/lib/types"
import { registerFormSchema, type RegisterFormData } from "@/lib/validation-schemas"
import { AlertCircle, CheckCircle2 } from "lucide-react"

const steps: Step[] = [
  { id: 1, name: "Informações Básicas", description: "Dados pessoais" },
  { id: 2, name: "Informações Profissionais", description: "Dados profissionais" },
  { id: 3, name: "Revisão", description: "Revise os dados" },
]

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [currentStep, setCurrentStep] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
    trigger,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      nome: "",
      email: "",
      cpf: "",
      telefone: "",
      senha: "",
      dataNascimento: undefined,
      matricula: "",
      registroProf: "",
      especialidade: "",
      nivelAcesso: undefined,
    },
    mode: "onBlur",
  })

  const formData = watch()

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault()
    
    let fieldsToValidate: (keyof RegisterFormData)[] = []
    
    if (currentStep === 1) {
      fieldsToValidate = ["nome", "email", "cpf", "telefone", "senha", "dataNascimento"]
    } else if (currentStep === 2) {
      fieldsToValidate = ["matricula", "nivelAcesso"]
    }
    
    const isValid = await trigger(fieldsToValidate)
    
    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data: RegisterFormData) => {
    setError(null)
    setSuccess(false)

    const userData: UserRequestDTO = {
      name: data.nome,
      email: data.email,
      cpf: data.cpf,
      password: data.senha,
      phone: data.telefone,
      birthDate: format(data.dataNascimento, "yyyy-MM-dd"),
      role: data.nivelAcesso,
      registration: data.matricula,
      teacherRegistration: data.registroProf || null,
      specialty: data.especialidade || null,
    }

    try {
      await createUser(userData)
      setSuccess(true)
      
      setTimeout(() => {
        reset()
        setCurrentStep(1)
        setSuccess(false)
      }, 3000)
    } catch (err) {
      if (err instanceof ApiError) {
        let errorMsg = err.message || "Erro ao criar usuário"
        
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
        setError("Erro desconhecido ao criar usuário. Tente novamente.")
      }
    }
  }

  return (
    <form 
      onSubmit={currentStep === steps.length ? handleSubmit(onSubmit) : handleNext}
      className={cn("flex flex-col gap-6 max-w-2xl mx-auto w-full", className)} 
      {...props}
    >
      <FieldGroup className="space-y-6">
        <FormHeader 
          title="Faça seu cadastro" 
          description="Preencha os dados"
          stepsCount={steps.length}
        />

        <Stepper steps={steps} currentStep={currentStep} />

        <div className="min-h-[400px]">
          {currentStep === 1 && (
            <BasicInfoStep 
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
            />
          )}

          {currentStep === 2 && (
            <ProfessionalInfoStep 
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
            />
          )}

          {currentStep === 3 && (
            <ReviewStep formData={formData} />
          )}
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
              Usuário criado com sucesso! Formulário será limpo em 3 segundos...
            </AlertDescription>
          </Alert>
        )}

        <FormNavigation 
          currentStep={currentStep}
          totalSteps={steps.length}
          onPrevious={handlePrevious}
          isSubmitting={isSubmitting}
        />
      </FieldGroup>
    </form>
  )
}
