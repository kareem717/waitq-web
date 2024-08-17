import { ComponentPropsWithoutRef, FC } from "react"
import { cn } from "@/lib/utils"
import { Waitlist } from "@/lib/sdk"
import { CopyInput } from "../../copy-input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { WaitlistJWTGenerator } from "./jwt-generator"

export interface WaitlistJWTDisplayProps extends ComponentPropsWithoutRef<typeof Card> {
  waitlist: Waitlist
}

export const WaitlistJWTDisplay: FC<WaitlistJWTDisplayProps> = ({ waitlist, ...props }) => {
  return (
    <Card {...props} className="w-full">
      <CardHeader>
        <CardTitle>JWT Settings</CardTitle>
        <CardDescription>
          Your client components use keys to interact with the waitlist API.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="flex justify-between">
          <span className="text-sm">JWT Secret</span>
          <div className="flex flex-col items-start gap-2 w-1/2">
            <CopyInput className="w-full" hidden value={waitlist.jwtSecret} />
            <p className="text-sm text-muted-foreground">
              Used to decode your JWTs. You can also use this to mint your own JWTs.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row p-4 justify-between items-center gap-4 rounded-md border shadow-sm bg-secondary dark:bg-background">
          <div className="flex flex-col items-start gap-2">
            <p>Generate a new JWT secret</p>
            <p className="text-sm text-muted-foreground">
              A random secret will be created, or you can create your own.
            </p>
          </div>
          <WaitlistJWTGenerator waitlist={waitlist} />
        </div>
      </CardContent>
    </Card>
  )
}