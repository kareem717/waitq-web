import { ComponentPropsWithoutRef, FC } from "react"
import { cn } from "@/lib/utils"
import { Menu } from "./menu"
import { ModeToggle } from "@/components/app/mode-toggle"
import { LogoDiv } from "@/components/logo-div"

export interface SidebarProps extends ComponentPropsWithoutRef<"div"> { }

export const Sidebar: FC<SidebarProps> = ({ className, ...props }) => {
  return (
    <div className={cn("hidden border-r bg-muted/40 md:block", className)} {...props}>
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <LogoDiv />
        </div>
        <div className="flex-1">
          <Menu />
        </div>
        <ModeToggle className="px-2 lg:px-4 mt-auto mb-4" />
      </div>
    </div>
  )
}