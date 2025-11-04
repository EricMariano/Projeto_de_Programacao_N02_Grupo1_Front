"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { FieldGroup, FieldSeparator } from "@/components/ui/field"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { Stepper, type Step } from "./components/stepper"
import { FormHeader } from "./components/form-header"
import { BasicInfoStep } from "./components/basic-info-step"
import { ProfessionalInfoStep } from "./components/professional-info-step"
import { ReviewStep } from "./components/review-step"
import { FormNavigation } from "./components/form-navigation"
import { api, type UserRequestDTO, ApiError } from "@/lib/api"
import { AlertCircle, CheckCircle2 } from "lucide-react"

interface FormData {
  // Informações Básicas
  nome: string
  email: string
  cpf: string
  telefone: string
  senha: string
  dataNascimento: Date | undefined
  
  // Informações Profissionais
  matricula: string
  registroProf: string
  especialidade: string
  nivelAcesso: string
}

const steps: Step[] = [
  { id: 1, name: "Informações Básicas", description: "Dados pessoais" },
  { id: 2, name: "Informações Profissionais", description: "Dados profissionais" },
  { id: 3, name: "Revisão", description: "Revise os dados" },
]

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    senha: "",
    dataNascimento: undefined,
    matricula: "",
    registroProf: "",
    especialidade: "",
    nivelAcesso: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, nivelAcesso: value }))
  }

  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, dataNascimento: date }))
  }

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setIsSubmitting(true)

    // Validações básicas
    if (!formData.dataNascimento) {
      setError("Data de nascimento é obrigatória")
      setIsSubmitting(false)
      return
    }

    // Prepara os dados no formato esperado pela API
    const userData: UserRequestDTO = {
      name: formData.nome,
      email: formData.email,
      cpf: formData.cpf || undefined,
      password: formData.senha,
      phone: formData.telefone,
      birthDate: format(formData.dataNascimento, "yyyy-MM-dd"),
      role: (formData.nivelAcesso as "STUDENT" | "INSTRUCTOR" | "ADMIN") || "STUDENT",
      registration: formData.matricula,
      teacherRegistration: formData.registroProf || null,
      specialty: formData.especialidade || null,
    }

    try {
      await api.createUser(userData)
      setSuccess(true)
      
      // Redireciona após 2 segundos
      setTimeout(() => {
        router.push("/")
      }, 2000)
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message || "Erro ao criar usuário")
      } else {
        setError("Erro desconhecido ao criar usuário. Tente novamente.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className={cn("flex flex-col gap-6 max-w-2xl mx-auto w-full", className)} {...props}>
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
              formData={formData}
              onInputChange={handleInputChange}
              onDateChange={handleDateChange}
            />
          )}

          {currentStep === 2 && (
            <ProfessionalInfoStep 
              formData={formData}
              onInputChange={handleInputChange}
              onSelectChange={handleSelectChange}
            />
          )}

          {currentStep === 3 && (
            <ReviewStep formData={formData} />
          )}
        </div>

        {/* Mensagens de erro e sucesso */}
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
              Usuário criado com sucesso! Redirecionando...
            </AlertDescription>
          </Alert>
        )}

        <FormNavigation 
          currentStep={currentStep}
          totalSteps={steps.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
        
        <FieldSeparator>
          Já tem uma conta?{" "}
          <Link href="/" className="text-primary hover:underline font-semibold">
            Faça seu login
          </Link>
        </FieldSeparator>
      </FieldGroup>
    </form>
  )
}
