import { LogoDiv } from "@/components/logo-div";
import AuthProvider from "@/components/providers/auth-provider";
import supabase from "@/lib/utils/supabase/server";
import { getAccount } from "@/actions/account";

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const sb = supabase();
	const { data } = await sb.auth.getUser();

	let account = null;

	if (data?.user) {
		const resp = await getAccount(data.user.id);
		account = resp.accounts[0];
	}

	return (
		<AuthProvider user={data?.user} account={account}>
			<div className="h-full w-full grid grid-cols-2">
				<div className="bg-secondary hidden md:col-span-1 md:flex flex-col justify-between items-start p-8" >
					<div className="flex items-center">
						<LogoDiv />
					</div>
					{/* <blockquote className="space-y-2">
					<p className="text-lg">&quot;{AuthConfig.quote.text}&quot;</p>
					<footer className="text-sm">{AuthConfig.quote.author}</footer>
				</blockquote> */}
				</div>
				<main className="col-span-2 md:col-span-1 flex flex-col justify-center items-center">
					{children}
				</main>
			</div >
		</AuthProvider>
	);
}
