import pricingPlans from "@/config/pricing";
import landing from "@/config/landing";
import { ComponentPropsWithoutRef, FC } from "react";
import { cn } from "@/lib/utils";
import { DurationToggle } from "./subscription-plan-card/duration-toggle";
import { PlanCard } from "./subscription-plan-card";

export interface PricingProps extends ComponentPropsWithoutRef<"div"> {
  cta?: string;
  forwardToStripe?: boolean;
}

export const Pricing: FC<PricingProps> = ({ className, cta, forwardToStripe, ...props }) => {
  const { title, subtitle, description, yearlyInsentive } = landing.pricing;
  const plans = pricingPlans

  return (
    <div className={cn("container py-24 sm:py-32", className)} {...props}>
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        {title}
      </h2>
      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        {subtitle}
      </h2>
      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground pb-8">
        {description}
      </h3>
      <DurationToggle defaultDuration="yearly" durationInsentive={yearlyInsentive} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4">
        {plans.map((plan, index) => (
          <PlanCard key={index} plan={plan} />
        ))}
      </div>
    </div>
  );
};