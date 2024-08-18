"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ComponentPropsWithoutRef, FC, useState } from "react"
import { cn } from "@/lib/utils"
import { Waitlist } from "@/lib/sdk"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Icons } from "@/components/icons"
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
import { toast } from "sonner"
import { genNewJWT } from "@/actions/waitlist"
import { useRouter } from "next/navigation"
import { useAction } from "next-safe-action/hooks"

export interface WaitlistJWTGeneratorProps extends ComponentPropsWithoutRef<typeof DropdownMenuTrigger> {
  waitlist: Waitlist
  onSuccess?: () => void
}

const formSchema = z.object({
  jwtSecret: z.string().min(32).max(512),
})

export const WaitlistJWTGenerator: FC<WaitlistJWTGeneratorProps> = ({ waitlist, className, onSuccess, ...props }) => {
  const [isCustomSecretDialogOpen, setIsCustomSecretDialogOpen] = useState(false)
  const [isRandomSecretDialogOpen, setIsRandomSecretDialogOpen] = useState(false)
  const [isGeneratingSecret, setIsGeneratingSecret] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jwtSecret: "",
    },
  })

  const { executeAsync } = useAction(genNewJWT, {
    onExecute: () => {
      setIsGeneratingSecret(true)
    },
    onSuccess: () => {
      toast.success("Done!", {
        description: "A new JWT has been generated for this waitlist. Please refresh the page to see the new credentials."
      })
      router.refresh()
    },
    onError: ({ error }) => {
      toast.error("Something went wrong", {
        description: error?.serverError || "An unknown error occurred",
      })
    },
    onSettled: () => {
      setIsGeneratingSecret(false)
    }
  })

  const handleGenerateSecret = async (secret?: string) => {
    await executeAsync({ waitlistId: waitlist.id, jwtSecret: secret })
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.jwtSecret == waitlist.jwtSecret) {
      toast.error("This is the same as the current secret", {
        description: "Please enter a new secret"
      })
      return
    }

    await handleGenerateSecret(values.jwtSecret)
  }

  return (
    <>
      <Dialog open={isCustomSecretDialogOpen} onOpenChange={setIsCustomSecretDialogOpen}>
        <DialogContent >
          <DialogHeader>
            <DialogTitle>Create a custom JWT secret</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-start gap-4 rounded-md border bg-yellow-900/30 p-4">
            <div className="flex items-center justify-center p-2 rounded-md bg-yellow-700">
              <Icons.warning className="w-4 h-4" />
            </div>
            <p className="flex flex-col gap-1 text-sm text-muted-foreground">
              <span className="font-bold text-foreground">This will invalidate all existing API keys</span>
              Generating a new JWT secret will invalidate all of your API keys, including your service_role and anon keys. Your project will also be restarted during this process, which will terminate any existing connections. You may receive API errors for up to 2 minutes while the new secret is deployed.
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" id="jwt-secret-form">
              <FormField
                control={form.control}
                name="jwtSecret"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custom JWT secret</FormLabel>
                    <FormControl>
                      <Input  {...field} />
                    </FormControl>
                    <FormDescription>
                      Minimally 32 characters long.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isGeneratingSecret}>Cancel</Button>
            </DialogClose>
            <Button type="submit" form="jwt-secret-form" disabled={isGeneratingSecret}>
              {isGeneratingSecret && <Icons.spinner className="animate-spin w-4 h-4 mr-2" />}
              Apply new JWT secret
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isRandomSecretDialogOpen} onOpenChange={setIsRandomSecretDialogOpen}>
        <DialogContent >
          <DialogHeader>
            <DialogTitle>Confirm to generate a new JWT secret</DialogTitle>
            <DialogDescription>
              This action cannot be undone and the old JWT secret will be lost. All existing API keys will be invalidated, and any open connections will be terminated.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-start gap-4 rounded-md border bg-secondary dark:bg-card p-4">
            <div className="flex items-center justify-center p-2 rounded-md bg-destructive">
              <Icons.warning className="w-4 h-4" />
            </div>
            <p className="flex flex-col gap-1 text-sm text-muted-foreground">
              <span className="font-bold text-foreground">This will invalidate all existing API keys</span>
              Generating a new JWT secret will invalidate all of your API keys, including your service_role and anon keys. Your project will also be restarted during this process, which will terminate any existing connections. You may receive API errors for up to 2 minutes while the new secret is deployed.
            </p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isGeneratingSecret}>Cancel</Button>
            </DialogClose>
            <Button variant="destructive" disabled={isGeneratingSecret} onClick={() => handleGenerateSecret()}>
              {isGeneratingSecret && <Icons.spinner className="animate-spin w-4 h-4 mr-2" />}
              Generate a new secret
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(buttonVariants({ variant: "outline" }), "bg-background dark:bg-card flex items-center gap-2 h-8", className)}
          {...props}
        >
          Generate a new secret
          <Icons.chevronDown className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="space-y-2">
          <DropdownMenuItem asChild onClick={() => setIsCustomSecretDialogOpen(true)}>
            <Button variant="ghost" className="flex items-center gap-2 h-8">
              <Icons.key className="w-4 h-4" />
              Generate your own secret
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild onClick={() => setIsRandomSecretDialogOpen(true)}>
            <Button variant="ghost" className="flex items-center gap-2 h-8">
              <Icons.refreshCw className="w-4 h-4" />
              Generate a random secret
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>


  )
}