"use client"

import { ComponentPropsWithoutRef, FC, useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import pricingPlans from "@/config/pricing";
import { PlanCard } from "../../subscription-plan-card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Icons } from "@/components/icons";
import landingConfig from "@/config/landing";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export interface PricingPlanSheetProps extends ComponentPropsWithoutRef<"div"> {
};

export const PricingPlanSheet: FC<PricingPlanSheetProps> = ({ className, ...props }) => {
  const plans = pricingPlans
  const { pricing } = landingConfig
  const [annual, setAnnual] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing</CardTitle>
        <CardDescription>
          Manage your billing information here.
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent className={cn("sm:max-w-none flex flex-col gap-6 overflow-y-auto", className)} {...props}>
            <SheetHeader>
              <SheetTitle>Upgrade to a Pro Plan</SheetTitle>
              <SheetDescription>
                Upgrade to a Pro Plan to unlock all features.
              </SheetDescription>
            </SheetHeader>
            <div className={cn(className, "flex items-center gap-2 w-full justify-center pb-14")}>
              <ToggleGroup type="single" value={annual.toString()} onValueChange={(value) => setAnnual(value === "true")}>
                <ToggleGroupItem value="false" className="text-md">Monthly</ToggleGroupItem>
                <ToggleGroupItem value="true" className="flex flex-row items-center justify-center gap-1 text-md" >
                  <span className="flex items-center justify-center text-xs gap-[2px] border-full bg-foreground/10 rounded-full px-2">
                    <Icons.sparkles className="text-yellow-600 fill-current size-[10px]" />
                    {pricing.yearlyInsentive}
                  </span>
                  Yearly
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full items-center justify-center">
              {plans.map((plan, i) => (
                <PlanCard key={i} plan={plan} className="w-full h-full" />
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};