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
import { createWaitlist } from "@/actions/waitlist";
import { useAuth } from "@/components/providers/auth-provider";

export interface CreateWaitlistFormProps extends ComponentPropsWithoutRef<'form'> {
  onSuccess?: () => void
}

const formSchema = z.object({
  name: z.string().min(3),
  accountId: z.string().uuid(),
})

export const CreateWaitlistForm: FC<CreateWaitlistFormProps> = ({ className, onSuccess, ...props }) => {
  const [isCreating, setIsCreating] = useState(false)
  const { account } = useAuth()

  if (!account) throw Error("Account not found")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      accountId: account.id,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsCreating(true)

    await createWaitlist(values)
    toast.success("Done!", {
      description: "Your waitlist has been created.",
    })
    
    setIsCreating(false)
    onSuccess?.()
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
        <Button type="submit" disabled={isCreating} className="w-full">
          {isCreating && (<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />)}
          Create
        </Button>
      </form>
    </Form>
  )
}