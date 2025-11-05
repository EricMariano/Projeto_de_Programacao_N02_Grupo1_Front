import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FormSection } from "./form-section"
import type { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form"
import type { RegisterFormData } from "@/lib/validation-schemas"

interface ProfessionalInfoStepProps {
  register: UseFormRegister<RegisterFormData>
  errors: FieldErrors<RegisterFormData>
  setValue: UseFormSetValue<RegisterFormData>
  watch: UseFormWatch<RegisterFormData>
}

export function ProfessionalInfoStep({ 
  register, 
  errors, 
  setValue,
  watch
}: ProfessionalInfoStepProps) {
  const nivelAcesso = watch("nivelAcesso")

  return (
    <FormSection title="Dados Profissionais">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="matricula">Matrícula *</FieldLabel>
          <Input 
            id="matricula" 
            type="text" 
            placeholder="Ex: 123456789" 
            className="h-11"
            {...register("matricula")}
          />
          {errors.matricula && (
            <p className="text-xs text-red-500 mt-1">{errors.matricula.message}</p>
          )}
        </Field>
        
        <Field>
          <FieldLabel htmlFor="registroProf">Registro Profissional (Opcional)</FieldLabel>
          <Input 
            id="registroProf" 
            type="text" 
            placeholder="Ex: CRM, CREA, etc." 
            className="h-11"
            {...register("registroProf")}
          />
          {errors.registroProf && (
            <p className="text-xs text-red-500 mt-1">{errors.registroProf.message}</p>
          )}
        </Field>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="especialidade">Especialidade (Opcional)</FieldLabel>
          <Input 
            id="especialidade" 
            type="text" 
            placeholder="Ex: Arquitetura de Sistemas" 
            className="h-11"
            {...register("especialidade")}
          />
          {errors.especialidade && (
            <p className="text-xs text-red-500 mt-1">{errors.especialidade.message}</p>
          )}
        </Field>
        
        <Field>
          <FieldLabel htmlFor="nivelAcesso">Nível de Acesso *</FieldLabel>
          <Select 
            value={nivelAcesso}
            onValueChange={(value) => setValue("nivelAcesso", value as "STUDENT" | "INSTRUCTOR" | "ADMIN")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um nível..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="STUDENT">Estudante</SelectItem>
              <SelectItem value="INSTRUCTOR">Instrutor</SelectItem>
              <SelectItem value="ADMIN">Administrador</SelectItem>
            </SelectContent>
          </Select>
          {errors.nivelAcesso && (
            <p className="text-xs text-red-500 mt-1">{errors.nivelAcesso.message}</p>
          )}
        </Field>
      </div>
    </FormSection>
  )
}

