"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { FieldGroup, FieldSeparator } from "@/components/ui/field"
import Link from "next/link"
import { Stepper, type Step } from "./components/stepper"
import { FormHeader } from "./components/form-header"
import { BasicInfoStep } from "./components/basic-info-step"
import { ProfessionalInfoStep } from "./components/professional-info-step"
import { ReviewStep } from "./components/review-step"
import { FormNavigation } from "./components/form-navigation"

interface FormData {
  // Informações Básicas
  nome: string
  email: string
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
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // TODO: Implementar a lógica de envio do formulário
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

        <FormNavigation 
          currentStep={currentStep}
          totalSteps={steps.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
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
