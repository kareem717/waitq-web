"use client";

import { Icons } from "../icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { OAuthButtons } from "./oauth-buttons";
import { useState, ComponentPropsWithoutRef, FC } from "react";
import supabase from "@/lib/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { cn } from "@/lib/utils";
import { env } from "@/env";
import redirects from "@/config/redirects";

const formSchema = z.object({
	email: z.string({
		required_error: "Email is required",
		message: "Invalid email address.",
	}).email({
		message: "Invalid email address.",
	}).min(1, {
		message: "Email is required",
	}),
})

export interface LoginFormProps extends ComponentPropsWithoutRef<"form"> {
	onSubmitProp?: (values: z.infer<typeof formSchema>) => void;
}

export const LoginForm: FC<LoginFormProps> = ({ onSubmitProp, className, ...props }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true);

		const sb = supabase();

		const { error } = await sb.auth.signInWithOtp({
			email: values.email,
			options: {
				emailRedirectTo: `${env.NEXT_PUBLIC_APP_URL}${redirects.auth.callback}`,
				shouldCreateUser: true,
			},
		})

		onSubmitProp?.(values);

		if (error) {
			console.error(error);
			toast.error("Uh oh!", {
				description: "Something went wrong. Please try again.",
			});
		} else {
			toast.success("Check your email", {
				description: "We've sent you a link to login.",
			});
		}

		setIsLoading(false);
	}

	return (
		<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<div className="flex flex-col space-y-2 text-center">
				<h1 className="text-2xl font-semibold tracking-tight">Login</h1>
				<p className="text-sm text-muted-foreground">Enter your email below to login</p>
			</div>
			<Form {...form}>
				<form {...props} onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-8", className)} >
					<div className="grid gap-2">
						<div className="grid gap-1">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input type="email" placeholder="name@example.com" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit" disabled={isLoading}>
								{
									isLoading ? <Icons.spinner className="w-4 h-4 animate-spin" /> : "Sign in with Email"
								}
							</Button>
						</div>
					</div>
				</form>
			</Form>
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t"></span>
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">Or continue with</span>
				</div>
			</div>
			<OAuthButtons providers={[{ provider: "google", icon: "google" }, { provider: "github", icon: "github" }]} disabled={isLoading} />
		</div>
	);
};
