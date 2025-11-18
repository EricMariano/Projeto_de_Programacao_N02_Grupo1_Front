"use client"

import { useState } from "react"
import { GalleryVerticalEnd } from "lucide-react"
import { UsersTable } from "./c-users-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CreateUserDialog } from "./c-create-user-dialog"
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
      <div className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg shadow-sm">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <span className="hidden sm:inline">Painel Administrativo - Grupo 01</span>
            <span className="sm:hidden">Admin</span>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Usuário
          </Button>
        </div>
      </div>

      <div className="flex-1 container mx-auto p-4 md:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Gerenciamento de Usuários</h1>
          <p className="text-muted-foreground">
            Visualize e gerencie todos os usuários cadastrados no sistema
          </p>
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

