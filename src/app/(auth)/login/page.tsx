import { getLoggedInAccount, getUser } from "@/actions/auth";
import { LoginForm } from "@/components/auth/login-form";
import redirects from "@/config/redirects";
import { redirect } from "next/navigation";

export default async function LoginPage() {
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
		<div className="mx-auto w-full max-w-[350px]">
			<LoginForm />
		</div>
	);
}
