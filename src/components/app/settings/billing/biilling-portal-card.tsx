import { getBillingPortalLink } from "@/actions/billing"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import redirects from "@/config/redirects"
import { env } from "@/env"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { ComponentPropsWithoutRef, FC } from "react"
import { Subscription } from "@/lib/sdk/index.js"

interface BillingPortalCardProps extends ComponentPropsWithoutRef<"div"> {
  subscription: Subscription
  accountId: string
}

export const BillingPortalCard: FC<BillingPortalCardProps> = async ({ className, subscription, accountId, ...props }) => {
  let billingPortalLink = ""
  const billingResp = await getBillingPortalLink({
    accountId,
    redirectUrl: `${env.NEXT_PUBLIC_APP_URL}${redirects.app.settings.billing}`,
  })

  if (billingResp?.data) {
    billingPortalLink = billingResp.data.link
  }


  return (
    <Card className="h-min max-w-md">
      <CardHeader>
        <CardTitle>Billing</CardTitle>
        <CardDescription>
          Manage your billing information here.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div>
          <span className="font-bold">
            Current Plan: <span className="text-primary">{subscription.name}</span>
          </span>
          <ul className="pl-2 mt-2">
            <li className="flex items-center gap-2">
              <Icons.check className="text-green-500" />
              Max Waitlists: <span className="text-primary font-bold">{subscription.maxWaitlists}</span>
            </li>
            <li className="flex items-center gap-2">
              <Icons.check className="text-green-500" />
              Max People Per Waitlist: <span className="text-primary font-bold">{subscription.maxPeoplePerWaitlist}</span>
            </li>
          </ul>
        </div>
        <Link
          className={cn(buttonVariants(), "w-full")}
          href={billingPortalLink}
        >
          Manage Billing
        </Link>
      </CardContent>
    </Card>
  )
}