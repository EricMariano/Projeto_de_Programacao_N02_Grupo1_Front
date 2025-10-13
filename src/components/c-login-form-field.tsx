import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
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
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Faça seu login</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Digite seu email abaixo para fazer login
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="usuario@exemplo.com" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <Input id="password" type="password" placeholder="********" required />
          <div className="flex items-center">
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Esqueceu sua senha?
            </a>
          </div>
        </Field>
        <Field> 
          <Button type="submit">Entrar</Button>
        </Field>
        <FieldSeparator>Não tem uma conta? <a href="#" className="hover:underline">Cadastre-se</a></FieldSeparator>
      </FieldGroup>
    </form>
  )
}
