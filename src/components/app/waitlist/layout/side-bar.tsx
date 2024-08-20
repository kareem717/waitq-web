import { ComponentPropsWithoutRef, FC } from "react"
import {
  LifeBuoy,
  SquareUser,
} from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { SmallLogoDiv } from "@/components/logo-div"
import { cn } from "@/lib/utils"
import WaitlistConfig from "@/config/waitlist"
import { Icons } from "@/components/icons"
import Link from "next/link"
import redirects from "@/config/redirects"
import { headers } from "next/headers"

export interface WaitlistSideBarProps extends ComponentPropsWithoutRef<"aside"> {
  waitlistId: string
};

export const WaitlistSideBar: FC<WaitlistSideBarProps> = ({ className, waitlistId, ...props }) => {
  const { nav } = WaitlistConfig

  return (
    <TooltipProvider>
      <aside className={cn("inset-y fixed left-0 z-20 flex h-full flex-col border-r", className)} {...props}  >
        <div className="border-b p-2 h-14 flex items-center justify-center">
          <SmallLogoDiv href={redirects.app.dashboard} />
        </div>
        <nav className="grid gap-1 p-2">
          {nav.map(({ label, icon, href }, index) => {
            const hrefWithParam = href.replace(':id', waitlistId)

            const Icon = Icons[icon]

            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link
                    href={hrefWithParam}
                    className={cn(buttonVariants({
                      variant: "ghost",
                      size: "icon",
                    }), "rounded-lg")}
                    aria-label={label}
                  >
                    <Icon className="size-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  {label}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </nav>
      </aside>
    </TooltipProvider >
  );
};