"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldGroup } from "@/components/ui/field"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Stepper, type Step } from "../register/multi-stepper/stepper"
import { FormHeader } from "../register/multi-stepper/form-header"
import { BasicInfoStep } from "../register/multi-stepper/basic-info-step"
import { ProfessionalInfoStep } from "../register/multi-stepper/professional-info-step"
import { ReviewStep } from "../register/multi-stepper/review-step"
import { FormNavigation } from "../register/multi-stepper/form-navigation"
import { createUser } from "../register/actions"
import { registerFormSchema, type RegisterFormData } from "../register/v-form-schema"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import {
  transformFormDataToUserDTO,
  extractApiErrorMessage,
  defaultFormValues,
  getFieldsToValidateByStep,
} from "./helpers"

const steps: Step[] = [
  { id: 1, name: "Informações Básicas", description: "Dados pessoais" },
  { id: 2, name: "Informações Profissionais", description: "Dados profissionais" },
  { id: 3, name: "Revisão", description: "Revise os dados" },
]

interface CreateUserFormProps {
  onSuccess?: () => void
}

export function CreateUserForm({ onSuccess }: CreateUserFormProps) {
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
    defaultValues: defaultFormValues,
    mode: "onBlur",
  })

  const formData = watch()

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault()

    const fieldsToValidate = getFieldsToValidateByStep(currentStep)
    const isValid = await trigger(fieldsToValidate)

    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1))
  }

  const resetForm = () => {
    reset()
    setCurrentStep(1)
    setError(null)
    setSuccess(false)
  }

  const onSubmit = async (data: RegisterFormData) => {
    setError(null)
    setSuccess(false)

    try {
      const userData = transformFormDataToUserDTO(data)
      await createUser(userData)
      
      setSuccess(true)

      setTimeout(() => {
        resetForm()
        onSuccess?.()
      }, 1500)
    } catch (err) {
      setError(extractApiErrorMessage(err, "Erro ao criar usuário. Tente novamente."))
    }
  }

  return (
    <form
      onSubmit={currentStep === steps.length ? handleSubmit(onSubmit) : handleNext}
      className="flex flex-col gap-6"
    >
      <FieldGroup className="space-y-6">
        <FormHeader
          title="Cadastro de Usuário"
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

          {currentStep === 3 && <ReviewStep formData={formData} />}
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
              Usuário criado com sucesso!
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

