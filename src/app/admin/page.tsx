"use client"

import { useState } from "react"
import { UsersTable } from "./c-users-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CreateUserDialog } from "./c-create-user-dialog"
import { Header } from "@/components/globals/header"
import useSWR from "swr"
import { getAllUsers } from "./actions"
import type { User } from "@/lib/interfaces"

export default function AdminPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  const { mutate } = useSWR<User[]>("users", getAllUsers, {
    revalidateOnFocus: false,
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        title="Painel Administrativo - Grupo 01" 
        shortTitle="Admin"
      />

      <div className="flex-1 container mx-auto p-4 md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold mb-2">Gerenciamento de Usuários</h1>
          <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Usuário
        </Button>
        </div>
        <UsersTable onUserCreated={() => mutate()} />
      </div>

      <div className="border-t border-border/50 py-4 text-center">
        <p className="text-xs text-muted-foreground">
          © 2025 Grupo 01 - N02. Sistema de Cadastro de Usuários.
        </p>
      </div>

      <CreateUserDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSuccess={() => {
          mutate()
        }}
      />
    </div>
  )
}

