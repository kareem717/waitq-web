"use client";

import { ComponentPropsWithoutRef, FC, useState } from "react"
import { Waitlist } from "@/lib/sdk"
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
import { updateWaitlist } from "@/actions/waitlist";
import { useAuth } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";

export interface EditWaitlistFormProps extends ComponentPropsWithoutRef<'form'> {
  waitlist: Waitlist
  onSuccess?: () => void
}

const formSchema = z.object({
  name: z.string().min(3),
})

export const EditWaitlistForm: FC<EditWaitlistFormProps> = ({ className, onSuccess, waitlist, ...props }) => {
  const [isUpdating, setIsUpdating] = useState(false)
  const { account } = useAuth()
  const router = useRouter()

  if (!account) throw Error("Account not found")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...waitlist,
    },
  })

  const { executeAsync } = useAction(updateWaitlist, {
    onSuccess: () => {
      toast.success("Done!", {
        description: "Your waitlist has been updated.",
      })
      onSuccess?.()
      router.refresh()
    },
    onError: ({ error }) => {
      toast.error("Something went wrong", {
        description: error.serverError || "An unknown error occurred",
      })
    },
    onSettled: () => {
      setIsUpdating(false)
      onSuccess?.()
    },
    onExecute: () => {
      setIsUpdating(true)
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await executeAsync({ waitlistId: waitlist.id, waitlist: values })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-8", className)} {...props}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Waitlist name</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormDescription>
                This is the public display name of the waitlist.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isUpdating} className="w-full">
          {isUpdating && (<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />)}
          Save
        </Button>
      </form>
    </Form>
  )
}