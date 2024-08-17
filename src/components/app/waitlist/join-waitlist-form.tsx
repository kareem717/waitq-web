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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsJoining(true)

    await joinWaitlist(waitlistId, values.email)

    toast.success("You've in!", {
      description: "You've been added to the waitlist."
    })

    setIsJoining(false)
    onSuccess?.()
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