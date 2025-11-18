import { ColumnDef } from "@tanstack/react-table"
import { User } from "@/lib/interfaces"
import { format } from "date-fns"

const roleLabels: Record<string, string> = {
  STUDENT: "Estudante",
  INSTRUCTOR: "Instrutor",
  ADMIN: "Administrador",
}

export function generateColumns(): ColumnDef<User>[] {
    return [
      {
        accessorKey: "id",
        header: "ID",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "name",
        header: "Nome",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "cpf",
        header: "CPF",
        cell: (info) => {
          const cpf = info.getValue() as string
          return cpf ? cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") : "-"
        },
      },
      {
        accessorKey: "phone",
        header: "Telefone",
        cell: (info) => {
          const phone = info.getValue() as string
          return phone
            ? phone.replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3")
            : "-"
        },
      },
      {
        accessorKey: "role",
        header: "Perfil",
        cell: (info) => {
          const role = info.getValue() as string
          return roleLabels[role] || role
        },
      },
      {
        accessorKey: "registration",
        header: "Matrícula",
        cell: (info) => info.getValue() || "-",
      },
      {
        accessorKey: "birthDate",
        header: "Data de Nascimento",
        cell: (info) => {
          const date = info.getValue() as string
          return date ? format(new Date(date), "dd/MM/yyyy") : "-"
        },
      },
      {
        accessorKey: "registrationDate",
        header: "Data de Cadastro",
        cell: (info) => {
          const date = info.getValue() as string
          return date ? format(new Date(date), "dd/MM/yyyy") : "-"
        },
      },
    ]
  }