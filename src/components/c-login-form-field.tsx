import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup className="space-y-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="rounded-full bg-primary/10 p-3 mb-1">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-7 w-7 text-primary" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Faça seu login</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Digite suas credenciais para acessar sua conta
          </p>
        </div>
        
        <div className="space-y-4">
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input 
              id="email" 
              type="email" 
              placeholder="seu.email@exemplo.com" 
              required 
              className="h-11"
            />
          </Field>
          
          <Field>
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            <Input 
              id="password" 
              type="password" 
              placeholder="********" 
              required 
              className="h-11"
            />
            <div className="flex items-center mt-2">
              <Link
                href="#"
                className="ml-auto text-xs text-primary hover:underline underline-offset-4 font-medium"
              >
                Esqueceu sua senha?
              </Link>
            </div>
          </Field>
        </div>
        
        <Button type="submit" className="w-full h-11 font-semibold">
          Entrar
        </Button>
        
        <FieldSeparator>
          Não tem uma conta?{" "}
          <Link href="/register" className="text-primary hover:underline font-semibold">
            Cadastre-se
          </Link>
        </FieldSeparator>
      </FieldGroup>
    </form>
  )
}
