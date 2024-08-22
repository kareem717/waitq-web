import { LoginForm } from "@/components/auth/login-form";
import redirects from "@/config/redirects";
import { redirect } from "next/navigation";
import createClient from "@/lib/utils/supabase/server";

export default async function LoginPage() {
	const supabase = createClient();
	const { data: { user } } = await supabase.auth.getUser();

	if (user) {
		return redirect(redirects.auth.logout);
	}

	return (
		<div className="mx-auto w-full max-w-[350px]">
			<LoginForm />
		</div>
	);
}
