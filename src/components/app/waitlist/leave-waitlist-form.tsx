"use client";

import { ComponentPropsWithoutRef, FC, useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { leaveWaitlist } from "@/actions/waitlist";
import { useAction } from "next-safe-action/hooks";

export interface LeaveWaitlistFormProps extends ComponentPropsWithoutRef<'form'> {
  waitlistId: string
  encodedEmail: string
  onSuccess?: () => void
}

const formSchema = z.object({
  encodedEmail: z.string().min(1),
})

export const LeaveWaitlistForm: FC<LeaveWaitlistFormProps> = ({ className, onSuccess, waitlistId, encodedEmail, ...props }) => {
  const [isLeaveing, setIsLeaveing] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      encodedEmail: encodedEmail,
    },
  })

  const { executeAsync } = useAction(leaveWaitlist, {
    onSuccess: () => {
      toast.success("Womp womp!", {
        description: "You've been removed from the waitlist."
      })
      onSuccess?.()
    },
    onError: ({ error }) => {
      toast.error("Something went wrong", {
        description: error.serverError || "An unknown error occurred",
      })
    },
    onSettled: () => {
      setIsLeaveing(false)
      onSuccess?.()
    },
    onExecute: () => {
      setIsLeaveing(true)
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await executeAsync({ id: waitlistId, encodedEmail: values.encodedEmail })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className} {...props}>
        <Button type="submit" disabled={isLeaveing} className="w-full">
          {isLeaveing && (<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />)}
          Leave
        </Button>
      </form>
    </Form>
  )
}