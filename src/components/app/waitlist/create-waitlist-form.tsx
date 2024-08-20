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
import { createWaitlist, isUrlAliasAvailable } from "@/actions/waitlist";
import { useAuth } from "@/components/providers/auth-provider";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { env } from "@/env";

export interface CreateWaitlistFormProps extends ComponentPropsWithoutRef<'form'> {
  onSuccess?: () => void
}

const formSchema = z.object({
  name: z.string().min(3),
  accountId: z.string().uuid(),
  urlAlias: z.string().min(1).max(32),
})

export const CreateWaitlistForm: FC<CreateWaitlistFormProps> = ({ className, onSuccess, ...props }) => {
  const [isCreating, setIsCreating] = useState(false)
  const [available, setAvailable] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { account } = useAuth()
  const router = useRouter()
  if (!account) throw Error("Account not found")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      accountId: account.id,
      urlAlias: "",
    },
  })

  const { executeAsync } = useAction(createWaitlist, {
    onSuccess: () => {
      form.reset()
      toast.success("Done!", {
        description: "Your waitlist has been created.",
      })
      router.refresh()
    },
    onError: ({ error }) => {
      toast.error("Something went wrong", {
        description: error.serverError || "An unknown error occurred",
      })
    },
    onSettled: () => {
      setIsCreating(false)
      onSuccess?.()
    },
    onExecute: () => {
      setIsCreating(true)
    }
  })

  const { executeAsync: checkAliasAvailable } = useAction(isUrlAliasAvailable, {
    onError: ({ error }) => {
      toast.error("Something went wrong checking alias availability", {
        description: error.serverError || "An unknown error occurred",
      })
    },
    onExecute: () => {
      setIsLoading(true)
    },
    onSettled: ({ result: { data } }) => {
      setIsLoading(false)
      setAvailable(!!data?.available)
    }
  })

  const isAliasAvailable = async () => {
    setTimeout(async () => {
      setIsLoading(true)
      const urlAlias = form.getValues("urlAlias")
      if (!urlAlias) {
        setIsLoading(false)
        setAvailable(null)
        return false
      }

      const result = await checkAliasAvailable({ urlAlias })
      return !!result?.data?.available
    }, 800);
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!isAliasAvailable()) {
      form.setError("urlAlias", {
        message: "Alias is not available",
      })
      return
    }

    await executeAsync({ waitlist: values })
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
        <FormField
          control={form.control}
          name="urlAlias"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <div className="flex items-center gap-2">
                  <span>URL alias</span>
                  {isLoading
                    ? <Icons.spinner className="h-3 w-3 animate-spin text-muted-foreground" />
                    : available === null ?
                      null : !!available ? (
                        <span className="text-green-500 text-xs">Available</span>
                      ) : (
                        <span className="text-red-500 text-xs">Unavailable</span>
                      )
                  }
                </div>
              </FormLabel>
              <FormControl>
                <Input  {...field} onChange={(e) => {
                  field.onChange(e.target.value.toLowerCase())
                  isAliasAvailable()
                }} />
              </FormControl>
              <FormDescription>
                Your users will be able to access the waitlist at <code>{env.NEXT_PUBLIC_APP_URL}/q/{field.value}</code>
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