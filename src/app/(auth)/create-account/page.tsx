import { CreateAccountForm } from "@/components/app/account/create-account-form";
import { getLoggedInAccount, getUser } from "@/actions/auth";
import redirects from "@/config/redirects";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function CreateAccountPage() {
  //TODO: Fix this
cookies().getAll();

	const userResp = await getUser();

	if (userResp?.data) {
		const accountResp = await getLoggedInAccount();
		if (accountResp?.data?.accounts[0]) {
			redirect(redirects.auth.afterLogin);
		} else {
			redirect(redirects.auth.createAccount);
		}
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
