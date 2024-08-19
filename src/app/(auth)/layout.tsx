import { LogoDiv } from "@/components/logo-div";
import AuthProvider from "@/components/providers/auth-provider";
import { getUser, getAccountByUserId } from "@/actions/auth";

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const resp = await getUser();
	const user = resp?.data;
	let account

	if (user) {
		const resp = await getAccountByUserId({ userId: user.id });
		account = resp?.data?.accounts[0];
	}

	return (
		<AuthProvider user={user || undefined} account={account} subscription={undefined}>
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
