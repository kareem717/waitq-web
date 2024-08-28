"use client";

import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, FC } from "react"
import { usePriceToggle } from "./use-duration-toggle"

export interface PriceDisplayProps extends ComponentPropsWithoutRef<"div"> {
  monthlyPrice: number
  annualMonthlyPrice: number
};

export const PriceDisplay: FC<PriceDisplayProps> = ({ monthlyPrice, annualMonthlyPrice, className, ...props }) => {
  const { isAnnual } = usePriceToggle()

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <div>
        <span className="text-3xl font-bold">${isAnnual ? annualMonthlyPrice : monthlyPrice}</span>
        <span className="text-muted-foreground"> /month</span>
      </div>
      {isAnnual && <span className="text-muted-foreground text-xs">Billed as ${(annualMonthlyPrice * 12).toFixed(2)} annually</span>}
    </div>
  );
};