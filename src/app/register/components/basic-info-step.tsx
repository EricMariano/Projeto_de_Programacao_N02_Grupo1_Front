import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { DatePicker } from "@/components/ui/date-picker"
import { FormSection } from "./form-section"

interface BasicInfoStepProps {
  formData: {
    nome: string
    email: string
    telefone: string
    senha: string
    dataNascimento: Date | undefined
  }
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onDateChange: (date: Date | undefined) => void
}

export function BasicInfoStep({ 
  formData, 
  onInputChange, 
  onDateChange 
}: BasicInfoStepProps) {
  return (
    <FormSection title="Dados Pessoais">
      <Field>
        <FieldLabel htmlFor="nome">Nome Completo *</FieldLabel>
        <Input 
          id="nome" 
          type="text" 
          placeholder="Ex.: João da Silva" 
          required 
          value={formData.nome}
          onChange={onInputChange}
          className="h-11"
        />
      </Field>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="email">Email *</FieldLabel>
          <Input 
            id="email" 
            type="email" 
            placeholder="seu.email@exemplo.com" 
            required 
            value={formData.email}
            onChange={onInputChange}
            className="h-11"
          />
        </Field>
        
        <Field>
          <FieldLabel htmlFor="telefone">Telefone *</FieldLabel>
          <Input 
            id="telefone" 
            type="tel" 
            placeholder="(00) 00000-0000" 
            required 
            value={formData.telefone}
            onChange={onInputChange}
            className="h-11"
          />
        </Field>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="senha">Senha *</FieldLabel>
          <Input 
            id="senha" 
            type="password" 
            placeholder="*******" 
            required 
            minLength={8}
            value={formData.senha}
            onChange={onInputChange}
            className="h-11"
          />
        </Field>
        
        <Field>
          <FieldLabel htmlFor="dataNascimento">Data de Nascimento *</FieldLabel>
          <DatePicker
            date={formData.dataNascimento}
            onDateChange={onDateChange}
            placeholder="Selecione sua data de nascimento"
          />
        </Field>
      </div>
    </FormSection>
  )
}

