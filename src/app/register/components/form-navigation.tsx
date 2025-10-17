import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"

interface FormNavigationProps {
  currentStep: number
  totalSteps: number
  onPrevious: () => void
  onNext: (e: React.FormEvent) => void
  onSubmit: (e: React.FormEvent) => void
}

export function FormNavigation({ 
  currentStep, 
  totalSteps, 
  onPrevious, 
  onNext, 
  onSubmit 
}: FormNavigationProps) {
  const isLastStep = currentStep === totalSteps
  const isFirstStep = currentStep === 1
  
  return (
    <div className="flex gap-3 pt-4">
      {!isFirstStep && (
        <Button 
          type="button" 
          variant="outline" 
          onClick={onPrevious}
          className="h-11 min-w-[120px]"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Voltar
        </Button>
      )}
      
      {!isLastStep ? (
        <Button 
          type="button" 
          onClick={onNext}
          className="h-11 flex-1 font-semibold"
        >
          Próximo
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      ) : (
        <Button 
          type="submit" 
          onClick={onSubmit}
          className="h-11 flex-1 font-semibold"
        >
          <Check className="h-4 w-4 mr-2" />
          Finalizar Cadastro
        </Button>
      )}
    </div>
  )
}

