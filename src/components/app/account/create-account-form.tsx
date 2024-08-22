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
import { createAccount } from "@/actions/auth";
import { useState } from "react";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";

const formSchema = z.object({
	name: z.string().min(3).max(32),
	email: z.string().email(),
});

export const CreateAccountForm = () => {
	const [isCreating, setIsCreating] = useState<boolean>(false);
	const { user } = useAuth();
	const router = useRouter();

	console.log(user)

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


		console.log({
			...values,
			userId: user.id
		})
		await executeAsync({
			...values,
			userId: user.id
		});
	}

	return (

		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
