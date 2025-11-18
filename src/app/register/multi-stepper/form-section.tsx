import { ReactNode } from "react"

interface FormSectionProps {
  title: string
  children: ReactNode
}

export function FormSection({ title, children }: FormSectionProps) {
  return (
    <div className="bg-muted/30 p-6 rounded-lg border border-border/50 animate-in fade-in-50 duration-300">
      <div className="flex items-center gap-2 mb-5">
        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
}

