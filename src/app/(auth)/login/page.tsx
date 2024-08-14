// "use client";

import { LoginForm } from "@/components/auth/login-form";
import { useAuth } from "@/components/providers/auth-provider";
import redirects from "@/config/redirects";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	// const router = useRouter();
	// const { user, account } = useAuth();

	// if (user) {
	// 	if (account) {
	// 		router.push(redirects.auth.afterLogin);
	// 	} else {
	// 		router.push(redirects.auth.createAccount);
	// 	}
	// }

	return (
		<div className="mx-auto w-full max-w-[350px]">
			<LoginForm />
		</div>
	);
}
