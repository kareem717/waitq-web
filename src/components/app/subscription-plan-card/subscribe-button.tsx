"use client";

import { Button } from "@/components/ui/button"
import { ComponentPropsWithoutRef, FC, useState } from "react"
import { cn } from "@/lib/utils"
import { getSubscriptionCheckoutLink } from "@/actions/subscription";
import redirects from "@/config/redirects";
import { usePriceToggle } from "./use-duration-toggle";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";
import { env } from "@/env";

export interface SubscribeButtonProps extends ComponentPropsWithoutRef<typeof Button> {
  text: string;
  monthlyPriceId: string;
  annualMonthlyPriceId: string;
  accountId?: string;
};

export const SubscribeButton: FC<SubscribeButtonProps> = ({ className, text = 'Subscribe', accountId, monthlyPriceId, annualMonthlyPriceId, ...props }) => {
  const { isAnnual } = usePriceToggle()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { executeAsync } = useAction(getSubscriptionCheckoutLink, {
    onSuccess: ({ data }) => {
      if (data?.link) {
        router.push(data.link)
      } else {
        toast.error("Something went wrong!", {
          description: "An unknown error occurred"
        })
      }
    },
    onError: ({ error }) => {
      toast.error("Something went wrong!", {
        description: error.serverError || "An unknown error occurred"
      })
    },
    onExecute: () => {
      setIsLoading(true)
    },
    onSettled: () => {
      setIsLoading(false)
    }
  })

  const handleClick = () => {
    if (accountId) {
      const redirectUrl = `${env.NEXT_PUBLIC_APP_URL}${redirects.app.settings.billing}`

      executeAsync({
        accountId,
        priceId: isAnnual ? annualMonthlyPriceId : monthlyPriceId,
        redirectUrl
      })
    } else {
      //TODO: add a flow to push to billing after account creation
      router.push(redirects.auth.createAccount)
    }
  }


  return (
    <Button
      className={cn("w-full", className)}
      {...props}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading && <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />}
      {text}
    </Button>
  );
};