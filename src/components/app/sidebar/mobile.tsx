import { ComponentPropsWithoutRef, FC } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader } from "@/components/ui/sheet"
import { Menu } from "./menu"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/app/mode-toggle"
import { LogoDiv } from "@/components/logo-div"

export interface MobileSidebarProps extends ComponentPropsWithoutRef<typeof Sheet> { }

export const MobileSidebar: FC<MobileSidebarProps> = ({ ...props }) => {
  return (
    <Sheet {...props}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 md:hidden"
        >
          <Icons.menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <SheetHeader className="px-2">
          <LogoDiv />
        </SheetHeader>
        <Menu className="px-2" />
        <ModeToggle className="mt-auto px-2 text-sm font-medium" />
      </SheetContent>
    </Sheet>
  )
}