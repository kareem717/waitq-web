import { PricingCard } from "../app/pricing/pricing-cards";
import pricingPlans from "@/config/pricing";
import landing from "@/config/landing";
import { ComponentPropsWithoutRef, FC } from "react";
import { cn } from "@/lib/utils";

export interface PricingProps extends ComponentPropsWithoutRef<"div"> { }

export const Pricing: FC<PricingProps> = ({ className, ...props }) => {
  const { title, subtitle, description } = landing.pricing;
  return (
    <div className={cn("container py-24 sm:py-32", className)} {...props}>
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        {title}
      </h2>
      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        {subtitle}
      </h2>
      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground pb-14">
        {description}
      </h3>
      <PricingCard plans={pricingPlans} />
    </div>
  );
};