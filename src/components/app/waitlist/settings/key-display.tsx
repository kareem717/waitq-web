import { ComponentPropsWithoutRef, FC } from "react"
import { Waitlist } from "@/lib/sdk"
import { CopyInput } from "../../copy-input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export interface WaitlistAPIKeyDisplayProps extends ComponentPropsWithoutRef<typeof Card> {
  waitlist: Waitlist
}

export const WaitlistAPIKeyDisplay: FC<WaitlistAPIKeyDisplayProps> = ({ waitlist, ...props }) => {
  return (
    <Card {...props} className="w-full">
      <CardHeader>
        <CardTitle>Waitlist API Keys</CardTitle>
        <CardDescription>
          Your client components use keys to interact with the waitlist API.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="flex justify-between">
          <div className="space-x-1">
            <Badge variant="secondary" className="rounded-sm py-1">
              anon
            </Badge>
            <Badge variant="secondary" className="rounded-sm py-1">
              public
            </Badge>
          </div>
          <div className="flex flex-col items-start gap-2 w-1/2">
            <CopyInput className="w-full" value={waitlist.anonKey} />
            <p className="text-sm text-muted-foreground">
              This key is used to authenticate your client components.
            </p>
          </div>
        </div>
        <Separator />
        <div className="flex justify-between">
          <div className="space-x-1">
            <Badge variant="secondary" className="rounded-sm py-1">
              service
            </Badge>
            <Badge variant="destructive" className="rounded-sm py-1">
              secret
            </Badge>
          </div>
          <div className="flex flex-col items-start gap-2 w-1/2">
            <CopyInput className="w-full" hidden value={waitlist.serviceKey} />
            <p className="text-sm text-muted-foreground">
              This key is used to authenticate your client components.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}