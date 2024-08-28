
import { PricingPlan } from "@/config/pricing";
import { ComponentPropsWithoutRef, FC } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { PriceDisplay } from "./price-display";
import { SubscribeButton } from "./subscribe-button";

export interface PlanCardProps extends ComponentPropsWithoutRef<"div"> {
  plan: PricingPlan
  accountId?: string;
};

export const PlanCard: FC<PlanCardProps> = ({ className, plan, accountId, ...props }) => {
  return (
    <Card
      className={cn(
        className,
        "flex flex-col justify-between",
        plan.isHighlighted
        && "border-2 border-primary lg:scale-105 animate-shine bg-gradient-to-r from-card via-foreground/10 to-card bg-[length:200%_100%]"
      )}
      {...props}
    >
      <CardHeader>
        <CardTitle className="pb-2">{plan.name}</CardTitle>
        <CardDescription className="pb-4">
          {plan.description}
        </CardDescription>
        <PriceDisplay
          monthlyPrice={plan.monthlyPrice.amount}
          annualMonthlyPrice={plan.annualMonthlyPrice.amount}
        />
      </CardHeader>
      <CardContent className="flex">
        <div className="space-y-4">
          {plan.features.map((feature) => (
            <span key={feature} className="flex">
              <Icons.check className="text-primary mr-2" />
              <h3>{feature}</h3>
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <SubscribeButton
          text={"Get Started"}
          monthlyPriceId={plan.monthlyPrice.stripePriceId}
          annualMonthlyPriceId={plan.annualMonthlyPrice.stripePriceId}
          accountId={accountId}
        />
      </CardFooter>
    </Card >
  );
};