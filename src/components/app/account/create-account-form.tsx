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
import { createAccount } from "@/actions/account";
import { useState } from "react";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";

const formSchema = z.object({
	username: z.string().min(3).max(32),
});

export const CreateAccountForm = () => {
	const [isCreating, setIsCreating] = useState<boolean>(false);
	const { user } = useAuth();
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
		},
	});

	const { executeAsync } = useAction(createAccount, {
		onSuccess: () => {
			toast.success("Account created successfully!");
			form.reset();
			router.refresh();
		},
		onError: ({ error }) => {
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
			username: values.username,
			userId: user.id
		});
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
					{isCreating && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}  Create account
				</Button>
			</form>
		</Form>
	);
};
