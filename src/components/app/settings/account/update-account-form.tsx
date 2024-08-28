"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"
import { updateAccount } from "@/actions/auth";
import { ComponentPropsWithoutRef, FC, useState } from "react";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { Account } from "@/lib/sdk";
import { cn } from "@/lib/utils";

export interface UpdateAccountFormProps extends ComponentPropsWithoutRef<"form"> {
  account: Account
}

const formSchema = z.object({
  name: z.string().min(3).max(32),
  email: z.string().email(),
});

export const UpdateAccountForm: FC<UpdateAccountFormProps> = ({ account, className, ...props }) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: account?.name || "",
      email: account?.email || "",
    },
  });

  const { executeAsync } = useAction(updateAccount, {
    onSuccess: () => {
      toast.success("Account updated successfully!");
      router.refresh();
    },
    onError: ({ error }) => {
      console.log(error);
      toast.error("Something went wrong", {
        description: error.serverError || "An unknown error occurred",
      })
    },
    onSettled: () => {
      setIsUpdating(false);
    },
    onExecute: () => {
      setIsUpdating(true);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!account) {
      throw new Error("Account not found");
    }

    await executeAsync({ id: account.id, fields: values });
  }

  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-4", className)} {...props}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Jimmy" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="jimmy@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full flex justify-center items-center">
          {isUpdating && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}  Update account
        </Button>
      </form>
    </Form>
  );
};
