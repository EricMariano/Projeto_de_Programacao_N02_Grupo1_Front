import { UserPlus } from "lucide-react"

interface FormHeaderProps {
  title: string
  description: string
  stepsCount?: number
}

export function FormHeader({ title, description, stepsCount }: FormHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="rounded-full bg-primary/10 p-3 mb-1">
        <UserPlus className="h-7 w-7 text-primary" />
      </div>
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground text-sm text-balance max-w-md">
        {stepsCount ? `${description} em ${stepsCount} etapas simples` : description}
      </p>
    </div>
  )
}

