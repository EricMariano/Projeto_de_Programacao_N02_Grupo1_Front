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

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-8 max-w-lg mx-auto w-full", className)} {...props}>
      <FieldGroup className="space-y-6">
        {/* header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-bold">Faça seu cadastro</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Preencha os dados abaixo para criar sua conta
          </p>
        </div>

        {/* campos */}
        <div className="flex flex-col gap-4">
          {/* Informações Básicas */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Informações Básicas</h3>
            
            <Field>
              <FieldLabel htmlFor="nome">Nome</FieldLabel>
              <Input id="nome" type="text" placeholder="Seu nome completo" required />
            </Field>
            
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" placeholder="usuario@exemplo.com" required />
            </Field>
            
            <Field>
              <FieldLabel htmlFor="senha">Senha</FieldLabel>
              <Input id="senha" type="password" placeholder="********" required />
            </Field>
            
            <Field>
              <FieldLabel htmlFor="telefone">Telefone</FieldLabel>
              <Input id="telefone" type="tel" placeholder="(00) 00000-0000" required />
            </Field>
          </div>

          {/* Informações Profissionais */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Informações Profissionais</h3>
            
            <Field>
              <FieldLabel htmlFor="matricula">Matrícula</FieldLabel>
              <Input id="matricula" type="text" placeholder="Sua matrícula" required />
            </Field>
            
            <Field>
              <FieldLabel htmlFor="especialidade">Especialidade</FieldLabel>
              <Input id="especialidade" type="text" placeholder="Sua especialidade" required />
            </Field>
            
            <Field>
              <FieldLabel htmlFor="registroProf">Registro Profissional</FieldLabel>
              <Input id="registroProf" type="text" placeholder="Número do registro profissional" required />
            </Field>
            
            <Field>
              <FieldLabel htmlFor="nivelAcesso">Nível de Acesso</FieldLabel>
              <Input id="nivelAcesso" type="text" placeholder="Nível de acesso (ex: Admin, Usuário)" required />
            </Field>
          </div>

          {/* Informações Financeiras e Datas */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Informações Financeiras e Datas</h3>
            
            <Field>
              <FieldLabel htmlFor="valorConta">Valor da Conta</FieldLabel>
              <Input id="valorConta" type="number" step="0.01" placeholder="0.00" required />
            </Field>
            
            <Field>
              <FieldLabel htmlFor="dataNascimento">Data de Nascimento</FieldLabel>
              <Input id="dataNascimento" type="date" required />
            </Field>
            
            <Field>
              <FieldLabel htmlFor="dataCadastro">Data de Cadastro</FieldLabel>
              <Input id="dataCadastro" type="date" required />
            </Field>
            
            <Field>
              <FieldLabel htmlFor="dataCriacao">Data de Criação</FieldLabel>
              <Input id="dataCriacao" type="datetime-local" required />
            </Field>
            
            <Field>
              <FieldLabel htmlFor="ultimoAcesso">Último Acesso</FieldLabel>
              <Input id="ultimoAcesso" type="datetime-local" required />
            </Field>
          </div>
        </div>

        {/* submit btn */}
        <div className="pt-4">
          <Button type="submit" className="w-full">Cadastrar</Button>
        </div>
        
        <FieldSeparator>
          Já tem uma conta?{" "}
          <a href="/login" className="text-primary hover:underline font-medium">
            Faça seu login
          </a>
        </FieldSeparator>
      </FieldGroup>
    </form>
  )
}
