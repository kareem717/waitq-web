"use client"

import { ComponentPropsWithoutRef, FC } from "react";
import { cn } from "@/lib/utils";
import { PricingPlan } from "@/config/pricing";

export interface PricingCardProps extends ComponentPropsWithoutRef<"div"> {
  plans: PricingPlan[];
}

export const PricingCard: FC<PricingCardProps> = ({ className, plans, ...props }) => {

  return (
    <div className={cn("w-full max-w-6xl mx-auto px-4 py-8", className)} {...props}>
      Stripe
    </div >
  )
}