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
import { useAuth } from "@/components/providers/auth-provider";
import { updateAccount } from "@/actions/account";
import { useState } from "react";
import { Icons } from "@/components/icons";

const formSchema = z.object({
  username: z.string().min(3).max(32),
});

export const UpdateAccountForm = () => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const { account } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: account?.username || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsUpdating(true);

    try {
      if (!account) {
        throw new Error("Account not found");
      }

      const response = await updateAccount(account.id, values);
      toast.success("Account updated successfully!");
    } catch (error) {
      console.error("Error updating account", error);
      toast.error("Something went wrong", {
        description: (error as Error).message,
      });
    } finally {
      setIsUpdating(false);
    }
  }

  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="jimmy77" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
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
