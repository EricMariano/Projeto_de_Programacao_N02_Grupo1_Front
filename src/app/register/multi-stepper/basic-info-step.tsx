import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { DatePicker } from "@/components/ui/date-picker"
import { FormSection } from "./form-section"
import type { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form"
import type { RegisterFormData } from "../v-form-schema"

interface BasicInfoStepProps {
  register: UseFormRegister<RegisterFormData>
  errors: FieldErrors<RegisterFormData>
  setValue: UseFormSetValue<RegisterFormData>
  watch: UseFormWatch<RegisterFormData>
}

export function BasicInfoStep({ 
  register, 
  errors, 
  setValue,
  watch
}: BasicInfoStepProps) {
  const dataNascimento = watch("dataNascimento")

  return (
    <FormSection title="Dados Pessoais">
      <Field>
        <FieldLabel htmlFor="nome">Nome Completo *</FieldLabel>
        <Input 
          id="nome" 
          type="text" 
          placeholder="Ex.: João da Silva" 
          className="h-11"
          {...register("nome")}
        />
        {errors.nome && (
          <p className="text-xs text-red-500 mt-1">{errors.nome.message}</p>
        )}
      </Field>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="email">Email *</FieldLabel>
          <Input 
            id="email" 
            type="email" 
            placeholder="seu.email@exemplo.com" 
            className="h-11"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
          )}
        </Field>
        
        <Field>
          <FieldLabel htmlFor="cpf">CPF *</FieldLabel>
          <Input 
            id="cpf" 
            type="text" 
            placeholder="Ex.: 123.456.789-00" 
            maxLength={11}
            className="h-11"
            {...register("cpf")}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '')
              setValue("cpf", value)
            }}
          />
          {errors.cpf && (
            <p className="text-xs text-red-500 mt-1">{errors.cpf.message}</p>
          )}
          {!errors.cpf && (
            <p className="text-xs text-muted-foreground mt-1">Digite apenas os 11 números do CPF</p>
          )}
        </Field>
      </div>
      
      <Field>
        <FieldLabel htmlFor="telefone">Telefone *</FieldLabel>
        <Input 
          id="telefone" 
          type="tel" 
          placeholder="Ex.: (11) 99999-9999" 
          maxLength={11}
          className="h-11"
          {...register("telefone")}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '')
            setValue("telefone", value)
          }}
        />
        {errors.telefone && (
          <p className="text-xs text-red-500 mt-1">{errors.telefone.message}</p>
        )}
        {!errors.telefone && (
          <p className="text-xs text-muted-foreground mt-1">Digite DDD + número (ex: 11999999999)</p>
        )}
      </Field>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="senha">Senha *</FieldLabel>
          <Input 
            id="senha" 
            type="password" 
            placeholder="Mínimo 6 caracteres" 
            className="h-11"
            {...register("senha")}
          />
          {errors.senha && (
            <p className="text-xs text-red-500 mt-1">{errors.senha.message}</p>
          )}
        </Field>
        
        <Field>
          <FieldLabel htmlFor="dataNascimento">Data de Nascimento *</FieldLabel>
          <DatePicker
            date={dataNascimento}
            onDateChange={(date) => setValue("dataNascimento", date as Date)}
            placeholder="Selecione sua data de nascimento"
          />
          {errors.dataNascimento && (
            <p className="text-xs text-red-500 mt-1">{errors.dataNascimento.message}</p>
          )}
        </Field>
      </div>
    </FormSection>
  )
}

