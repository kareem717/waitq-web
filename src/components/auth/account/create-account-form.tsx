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
import { createAccount } from "@/actions/auth";
import { ComponentPropsWithoutRef, FC, useState } from "react";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { User } from '@supabase/supabase-js';
import { cn } from "@/lib/utils";

export interface CreateAccountFormProps extends ComponentPropsWithoutRef<"form"> {
	user: User
}

const formSchema = z.object({
	name: z.string().min(3).max(10),
	email: z.string().email(),
});

export const CreateAccountForm: FC<CreateAccountFormProps> = ({ user, className, ...props }) => {
	const [isCreating, setIsCreating] = useState<boolean>(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: user?.email || "",
		},
	});

	const { executeAsync } = useAction(createAccount, {
		onSuccess: () => {
			toast.success("Account created successfully!");
			form.reset();
			router.refresh();
		},
		onError: ({ error }) => {
			console.log(error)
			toast.error("Something went wrong", {
				description: error.serverError || "An unknown error occurred",
			})
		},
		onSettled: () => {
			setIsCreating(false);
		},
		onExecute: () => {
			setIsCreating(true);
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		if (!user) {
			throw new Error("User not found");
		}

		await executeAsync({
			...values,
			userId: user.id
		});
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
					{isCreating && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}  Create account
				</Button>
			</form>
		</Form>
	);
};
