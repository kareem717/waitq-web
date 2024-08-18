"use client";

import { ComponentPropsWithoutRef, FC, useState } from "react"
import { cn } from "@/lib/utils"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { joinWaitlist } from "@/actions/waitlist";
import { useAction } from "next-safe-action/hooks";

export interface JoinWaitlistFormProps extends ComponentPropsWithoutRef<'form'> {
  waitlistId: string
  onSuccess?: () => void
}

const formSchema = z.object({
  email: z.string().email(),
})

export const JoinWaitlistForm: FC<JoinWaitlistFormProps> = ({ className, onSuccess, waitlistId, ...props }) => {
  const [isJoining, setIsJoining] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })


  const { executeAsync } = useAction(joinWaitlist, {
    onSuccess: () => {
      toast.success("Done!", {
        description: "Your waitlist has been updated.",
      })
      onSuccess?.()
    },
    onError: ({ error }) => {
      toast.error("Something went wrong", {
        description: error.serverError || "An unknown error occurred",
      })
    },
    onSettled: () => {
      setIsJoining(false)
      onSuccess?.()
    },
    onExecute: () => {
      setIsJoining(true)
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await executeAsync({ waitlistId, email: values.email })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-8", className)} {...props}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormDescription>
                This is the email you&apos;ll use to join the waitlist.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isJoining} className="w-full">
          {isJoining && (<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />)}
          Join
        </Button>
      </form>
    </Form>
  )
}