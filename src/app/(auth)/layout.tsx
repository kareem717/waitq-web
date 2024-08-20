import { LogoDiv } from "@/components/logo-div";

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
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
	);
}
