import { CreateAccountForm } from "@/components/app/account/create-account-form";
import redirects from "@/config/redirects";
import { redirect } from "next/navigation";
import createClient from "@/lib/utils/supabase/server";

export default async function CreateAccountPage() {
	const supabase = createClient();
	const { data: { user } } = await supabase.auth.getUser();

	if (!user) {
		return redirect(redirects.auth.login);
	}

	return (
		<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<div className="flex flex-col space-y-2 text-center">
				<h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
				<p className="text-sm text-muted-foreground">Finish setting up your account to get started</p>
			</div>
			<div className="mx-auto w-full max-w-[350px]">
				<CreateAccountForm />
			</div>
		</div>
	);

}
