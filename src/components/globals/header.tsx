import { GalleryVerticalEnd } from "lucide-react"
import { ReactNode } from "react"

interface HeaderProps {
  title: string
  shortTitle?: string
  children?: ReactNode
}

export function Header({ title, shortTitle = "Grupo 01", children }: HeaderProps) {
  return (
    <div className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2 font-semibold text-foreground">
          <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg shadow-sm">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <span className="hidden sm:inline">{title}</span>
          <span className="sm:hidden">{shortTitle}</span>
        </div>
        {children && <div className="flex items-center">{children}</div>}
      </div>
    </div>
  )
}

