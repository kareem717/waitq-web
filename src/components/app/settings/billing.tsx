"use client"

import { getBillingPortalLink } from "@/actions/subscription";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAction } from "next-safe-action/hooks";
import { redirect } from "next/navigation";
import { ComponentPropsWithoutRef, FC, useState } from "react"
import { toast } from "sonner";

export interface BillingPortalButtonProps extends ComponentPropsWithoutRef<typeof Button> {
  accountId: string
  text?: string
};

export const BillingPortalButton: FC<BillingPortalButtonProps> = async ({ accountId, className, text = "View Billing Settings", ...props }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { executeAsync } = useAction(getBillingPortalLink, {
    onSuccess: ({ data }) => {
      if (data?.link) {
        redirect(data.link)
      } else {
        toast.error("Something went wrong", {
          description: "No link provided",
        })
      }
    },
    onError: ({ error }) => {
      toast.error("Something went wrong", {
        description: error.serverError || "An unknown error occurred",
      })
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onExecute: () => {
      setIsLoading(true);
    },
  });

  return (
    <Button
      {...props}
      className={cn(className, 'w-full')}
      onClick={() => executeAsync({ accountId, redirectUrl: window.location.href })}
      disabled={isLoading}
    >
      {isLoading && <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />}
      {text}
    </Button>
  );
};