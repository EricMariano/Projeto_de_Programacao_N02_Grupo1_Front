"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CreateUserForm } from "./c-create-user-form"

interface CreateUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function CreateUserDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateUserDialogProps) {
  const [key, setKey] = useState(0)

  const handleSuccess = () => {
    onOpenChange(false)
    onSuccess?.()
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setKey((prev) => prev + 1)
    }
    onOpenChange(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cadastrar Novo Usuário</DialogTitle>
          <DialogDescription>
            Preencha os dados para criar um novo usuário no sistema
          </DialogDescription>
        </DialogHeader>

        <CreateUserForm
          key={key}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  )
}

