import { getCachedAccount, getCachedSubscription } from "@/app/(app)/layout"
import pricingPlans from "@/config/pricing";
import landing from "@/config/landing";
import { PlanCard } from "@/components/app/subscription-plan-card";
import { DurationToggle } from "@/components/app/subscription-plan-card/duration-toggle";
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { getBillingPortalLink } from "@/actions/billing";
import { env } from "@/env";
import redirects from "@/config/redirects";
import Link from "next/link";
import { cn } from "@/lib/utils";
export default async function BillingSettingsPage({ searchParams }: { searchParams: { open?: string } }) {
  const { yearlyInsentive } = landing.pricing;
  const plans = pricingPlans

  const account = await getCachedAccount()
  const subscription = await getCachedSubscription()

  if (subscription?.subscriptionRelationship) {
    const resp = await getBillingPortalLink({
      accountId: account.id,
      redirectUrl: `${env.NEXT_PUBLIC_APP_URL}${redirects.app.settings.billing}`
    })

    const billingPortalLink = resp?.data?.link

    if (!billingPortalLink) {
      throw new Error("Billing portal link not found")
    }

    return (
      <Card className="h-min">
        <CardHeader>
          <CardTitle>Your subscription is active</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div>
            Current Plan: <span className="font-bold text-primary">{subscription.subscription.name}</span>
          </div>
          <Link
            href={billingPortalLink}
            className={cn(buttonVariants(), "w-full")}
          >
            Manage Subscription
          </Link>
        </CardContent>
      </Card>
    )
  } else {
    return (
      <Sheet defaultOpen={searchParams.open === "true"}>
        <Card className="h-min">
          <CardHeader>
            <CardTitle>You dont currently have a subscription</CardTitle>
            <CardDescription>Subscribe to a plan to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <SheetTrigger asChild className="w-full">
              <Button>Subscribe</Button>
            </SheetTrigger>
          </CardContent>
        </Card>
        <SheetContent className="overflow-y-auto min-w-fit flex flex-col gap-8">
          <SheetHeader>
            <SheetTitle>Select a plan</SheetTitle>
            <SheetDescription>
              Select a plan to fit your needs
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col justify-between items-center w-full">
            <DurationToggle defaultDuration="yearly" durationInsentive={yearlyInsentive} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {plans.map((plan, index) => (
                <PlanCard key={index} plan={plan} accountId={account?.id} />
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    )
  }
}
