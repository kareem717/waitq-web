"use client";

import pricingPlans from "@/config/pricing";
import landing from "@/config/landing";
import { ComponentPropsWithoutRef, FC, useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Icons } from "../icons";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import redirects from "@/config/redirects";

export interface PricingProps extends ComponentPropsWithoutRef<"div"> { }

export const Pricing: FC<PricingProps> = ({ className, ...props }) => {
  const [isAnnual, setIsAnnual] = useState<boolean>(true)

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
      <div className={cn(className, "flex items-center gap-2 w-full justify-center pb-14")}>
        <ToggleGroup type="single" value={isAnnual.toString()} onValueChange={(value) => setIsAnnual(value === "true")}>
          <ToggleGroupItem value="false" className="text-md">Monthly</ToggleGroupItem>
          <ToggleGroupItem value="true" className="flex flex-row items-center justify-center gap-1 text-md" >
            <span className="flex items-center justify-center text-xs gap-[2px] border-full bg-foreground/10 rounded-full px-2">
              <Icons.sparkles className="text-yellow-600 fill-current size-[10px]" />
              {yearlyInsentive}
            </span>
            Yearly
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4">
        {plans.map(
          ({ annualMonthlyPrice, monthlyPrice, name, isHighlighted, features }, index) => (
            <Card
              key={index}
              className={cn(
                "flex flex-col justify-between",
                isHighlighted
                && "border-2 border-primary lg:scale-105 animate-shine bg-gradient-to-r from-card via-foreground/10 to-card bg-[length:200%_100%]"
              )}
            >
              <CardHeader>
                <CardTitle className="pb-2">{name}</CardTitle>
                <CardDescription className="pb-4">
                  {description}
                </CardDescription>
                <div className="flex flex-col gap-2">
                  <div>
                    <span className="text-3xl font-bold">${isAnnual ? annualMonthlyPrice.amount : monthlyPrice.amount}</span>
                    <span className="text-muted-foreground"> /month</span>
                  </div>
                  {isAnnual && <span className="text-muted-foreground text-xs">Billed as ${(annualMonthlyPrice.amount * 12).toFixed(2)} annually</span>}
                </div>
              </CardHeader>
              <CardContent className="flex">
                <div className="space-y-4">
                  {features.map((feature) => (
                    <span key={feature} className="flex">
                      <Icons.check className="text-primary mr-2" />
                      <h3>{feature}</h3>
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  className={cn(buttonVariants({
                    variant: isHighlighted ? "default" : "secondary"
                  }), "w-full")}
                  href={redirects.app.settings.account}
                >
                  Get Started
                </Link>
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </div>
  );
};