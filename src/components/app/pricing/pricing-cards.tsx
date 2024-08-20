"use client"

import { ComponentPropsWithoutRef, FC } from "react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import redirects from "@/config/redirects";
import { useAction } from "next-safe-action/hooks";
import { getSubscriptionCheckoutLink, updateSubscription, cancelSubscription } from "@/actions/subscription";
import { toast } from "sonner";
import { Icons } from "@/components/icons";

export type PricingPlanPrice = {
  amount: number;
  stripePriceId: string;
}

export type PricingPlan = {
  name: string;
  monthlyPrice: PricingPlanPrice;
  annualPrice: PricingPlanPrice;
  features: string[];
  isHighlighted?: boolean;
  isDisabled?: boolean;
}

export interface PricingCardProps extends ComponentPropsWithoutRef<"div"> {
  plans: PricingPlan[];
}

export const PricingCard: FC<PricingCardProps> = ({ className, plans, ...props }) => {
  const [isAnnual, setIsAnnual] = useState(true)
  const { account, subscription } = useAuth();
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  const { executeAsync: checkout } = useAction(getSubscriptionCheckoutLink, {
    onExecute: () => {
      setIsLoading(true)
    },
    onSettled: () => {
      setIsLoading(false)
    },
    onSuccess: ({ data }) => {
      router.push(data?.link || "")
    },
    onError: (error) => {
      console.error(error)
      toast.error("An error occurred while fetching the subscription checkout link. Please try again.")
    }
  })
  const { executeAsync: cancelSub } = useAction(cancelSubscription, {
    onExecute: () => {
      setIsLoading(true)
    },
    onSettled: () => {
      setIsLoading(false)
    },
    onSuccess: () => {
      toast.success("Subscription cancelled successfully.")
      router.refresh()
    },
    onError: ({ error }) => {
      console.error(error)
      toast.error("An error occurred while fetching the subscription checkout link. Please try again.")
    }
  })
  const { executeAsync: updateSub } = useAction(updateSubscription, {
    onExecute: () => {
      setIsLoading(true)
    },
    onSettled: () => {
      setIsLoading(false)
    },
    onSuccess: () => {
      toast.success("Subscription updated successfully.")
      router.refresh()
    },
    onError: (error) => {
      console.error(error)
      toast.error("An error occurred while fetching the subscription checkout link. Please try again.")
    }
  })

  const calculateSavings = (monthlyPrice: number, annualPrice: number) => {
    const monthlyCost = monthlyPrice * 12
    const annualCost = annualPrice

    const savings = monthlyCost - annualCost
    return savings.toFixed(2)
  }

  const handleSubscribe = async (priceId: string) => {
    if (isLoading) {
      toast.info("Please wait while we process your request.")
      return
    }

    if (!account) {
      router.push(redirects.auth.createAccount)
    }

    await checkout({
      priceId,
      redirectUrl: window.location.href,
    })
  }

  const handleCancel = async () => {
    if (isLoading) {
      toast.info("Please wait while we process your request.")
      return
    }

    if (!account) {
      router.push(redirects.auth.createAccount)
      return
    }

    await cancelSub({
      accountId: account.id,
    })
  }

  const handleUpdate = async (priceId: string) => {
    if (isLoading) {
      toast.info("Please wait while we process your request.")
      return
    }

    if (!account) {
      router.push(redirects.auth.createAccount)
      return
    }

    await updateSub({
      priceId,
      accountId: account.id,
    })
  }

  return (
    <div className={cn("w-full max-w-6xl mx-auto px-4 py-8", className)} {...props}>
      <div className="flex justify-center items-center gap-4 mb-8">
        <span className={`text-sm font-medium ${!isAnnual ? 'text-primary' : 'text-muted-foreground'}`}>Monthly</span>
        <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
        <span className={`text-sm font-medium ${isAnnual ? 'text-primary' : 'text-muted-foreground'}`}>Annual</span>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={cn("rounded-lg border p-6 relative flex flex-col justify-between gap-8 bg-card",
              plan.isHighlighted
                ? "border-primary border-2 shadow-lg scale-105"
                : "border-border")}
          >
            {plan.isHighlighted
              && (<div className="absolute -top-4 left-1/2 transform -translate-x-1/2 mx-auto rounded-full px-5 py-1 border-primary border-2 bg-card font-semibold">
                Best value
              </div>)}
            <div>
              <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">
                  ${isAnnual ? plan.annualPrice.amount : plan.monthlyPrice.amount}
                </span>
                <span className="text-muted-foreground">/{isAnnual ? 'year' : 'month'}</span>
              </div>
              {isAnnual && calculateSavings(plan.monthlyPrice.amount, plan.annualPrice.amount) !== "0.00" && (
                <Badge className="absolute top-7 right-4">
                  Save ${calculateSavings(plan.monthlyPrice.amount, plan.annualPrice.amount)} per year
                </Badge>
              )}
            </div>
            <ul className="mb-6 space-y-2">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center text-sm">
                  <svg
                    className="w-4 h-4 mr-2 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <Button className="w-full"
              onClick={() => {
                if (subscription) {
                  if (isAnnual) {
                    const isCurrentPlan = plan.annualPrice.stripePriceId === subscription.stripePriceID
                    isCurrentPlan ? handleCancel() : handleUpdate(plan.annualPrice.stripePriceId);
                  } else {
                    const isCurrentPlan = plan.monthlyPrice.stripePriceId === subscription.stripePriceID
                    isCurrentPlan ? handleCancel() : handleUpdate(plan.monthlyPrice.stripePriceId);
                  }
                } else {
                  handleSubscribe(isAnnual ? plan.annualPrice.stripePriceId : plan.monthlyPrice.stripePriceId);
                }
              }}
              variant={subscription
                ? subscription.stripePriceID === (isAnnual ? plan.annualPrice.stripePriceId : plan.monthlyPrice.stripePriceId)
                  ? "secondary"
                  : "default"
                : "default"}
              disabled={isLoading}
            >
              {isLoading && (<Icons.spinner className="w-4 h-4 mr-2 animate-spin" />)}
              {subscription
                ? subscription.stripePriceID === (isAnnual ? plan.annualPrice.stripePriceId : plan.monthlyPrice.stripePriceId)
                  ? "Cancel"
                  : "Subscribe"
                : "Get Started"}
            </Button>
          </div>
        ))}
      </div>
    </div >
  )
}