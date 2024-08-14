"use client"

import { z } from "zod"
import { FC, ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"

const formSchema = z.object({
  firstName: z.string({
    required_error: "First name is required.",
    invalid_type_error: "First name must be a string.",
  }).min(2, {
    message: "First name must be at least 2 characters.",
  }).max(100, {
    message: "First name must be at most 100 characters.",
  }),
  lastName: z.string({
    required_error: "Last name is required.",
    invalid_type_error: "Last name must be a string.",
  }).min(2, {
    message: "Last name must be at least 2 characters.",
  }).max(100, {
    message: "Last name must be at most 100 characters.",
  }),
  email: z.string({
    required_error: "Email is required.",
    invalid_type_error: "Email must be a string.",
  }).email({
    message: "Email is not valid.",
  }).min(2, {
    message: "Email must be at least 2 characters.",
  }).max(360, {
    message: "Email must be at most 360 characters.",
  }),
})

export interface WaitlistFormProps extends ComponentPropsWithoutRef<"form"> { }

export const WaitlistForm: FC<WaitlistFormProps> = ({ className, ...props }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast.success("Thanks for signing up!", {
      description: "Make sure to check your email for updates.",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-4 sm:space-y-8", className)} {...props}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Joe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="joe@doe.com" {...field} />
              </FormControl>
              <FormDescription>
                We&#39;ll send you an email when we launch.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </Form>
  );
};
