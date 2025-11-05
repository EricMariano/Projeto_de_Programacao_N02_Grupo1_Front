import { format } from "date-fns"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"
import type { RegisterFormData } from "@/lib/validation-schemas"

interface ReviewStepProps {
  formData: RegisterFormData
}

interface SummaryItemProps {
  label: string
  value: string
}

function SummaryItem({ label, value }: SummaryItemProps) {
  return (
    <div className="flex justify-between py-1">
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium">{value || "—"}</span>
    </div>
  )
}

export function ReviewStep({ formData }: ReviewStepProps) {
  return (
    <div className="space-y-5 animate-in fade-in-50 duration-300">
      <div className="bg-muted/30 p-6 rounded-lg border border-border/50">
        <h4 className="text-sm font-semibold mb-3 text-foreground">Resumo do Cadastro</h4>
        <div className="space-y-2 text-sm">
          <SummaryItem label="Nome" value={formData.nome || "—"} />
          <SummaryItem label="Email" value={formData.email || "—"} />
          <SummaryItem label="CPF" value={formData.cpf || "—"} />
          <SummaryItem 
            label="Data de Nascimento" 
            value={formData.dataNascimento ? format(formData.dataNascimento, "dd/MM/yyyy") : "—"} 
          />
          <SummaryItem label="Matrícula" value={formData.matricula || "—"} />
          <SummaryItem label="Registro Profissional" value={formData.registroProf || "—"} />
          <SummaryItem label="Especialidade" value={formData.especialidade || "—"} />
          <SummaryItem 
            label="Nível de Acesso" 
            value={
              formData.nivelAcesso === "STUDENT" 
                ? "Estudante" 
                : formData.nivelAcesso === "INSTRUCTOR" 
                ? "Instrutor" 
                : formData.nivelAcesso === "ADMIN"
                ? "Administrador"
                : "—"
            } 
          />
        </div>
      </div>
      
      <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertDescription className="text-xs text-blue-900 dark:text-blue-100">
          Ao finalizar cadastro, você será redirecionado para a lista de profissionais cadastrados
        </AlertDescription>
      </Alert>
    </div>
  )
}

