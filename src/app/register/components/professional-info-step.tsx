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

interface ProfessionalInfoStepProps {
  formData: {
    matricula: string
    registroProf: string
    especialidade: string
    nivelAcesso: string
  }
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSelectChange: (value: string) => void
}

export function ProfessionalInfoStep({ 
  formData, 
  onInputChange, 
  onSelectChange 
}: ProfessionalInfoStepProps) {
  return (
    <FormSection title="Dados Profissionais">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="matricula">Matrícula *</FieldLabel>
          <Input 
            id="matricula" 
            type="text" 
            placeholder="Ex: 123456789" 
            required 
            value={formData.matricula}
            onChange={onInputChange}
            className="h-11"
          />
        </Field>
        
        <Field>
          <FieldLabel htmlFor="registroProf">Registro Profissional *</FieldLabel>
          <Input 
            id="registroProf" 
            type="text" 
            placeholder="Ex: Não sei oq é esse registro galera" 
            required 
            value={formData.registroProf}
            onChange={onInputChange}
            className="h-11"
          />
        </Field>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="especialidade">Especialidade *</FieldLabel>
          <Input 
            id="especialidade" 
            type="text" 
            placeholder="Ex: Arquitetura de Sistemas" 
            required 
            value={formData.especialidade}
            onChange={onInputChange}
            className="h-11"
          />
        </Field>
        
        <Field>
          <FieldLabel htmlFor="nivelAcesso">Nível de Acesso *</FieldLabel>
          <Select 
            value={formData.nivelAcesso}
            onValueChange={onSelectChange}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um nível..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">Usuário</SelectItem>
              <SelectItem value="admin">Administrador</SelectItem>
              <SelectItem value="moderator">Moderador</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>
    </FormSection>
  )
}

