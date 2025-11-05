import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

export interface Step {
  id: number
  name: string
  description: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div 
            key={step.id} 
            className="flex flex-col items-center relative" 
            style={{ width: `${100 / steps.length}%` }}
          >
            {index < steps.length - 1 && (
              <div 
                className={cn(
                  "absolute top-5 left-1/2 w-full h-0.5 -z-10",
                  step.id < currentStep ? "bg-primary" : "bg-border"
                )}
              />
            )}
            
            <div 
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all mb-2",
                step.id === currentStep && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                step.id < currentStep && "bg-primary text-primary-foreground",
                step.id > currentStep && "bg-muted text-muted-foreground border-2 border-border"
              )}
            >
              {step.id < currentStep ? (
                <Check className="h-5 w-5" />
              ) : (
                step.id
              )}
            </div>
            
            <div className="text-center max-w-[120px]">
              <p className={cn(
                "text-xs font-medium",
                step.id <= currentStep ? "text-foreground" : "text-muted-foreground"
              )}>
                {step.name}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5 hidden sm:block">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

