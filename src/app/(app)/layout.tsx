import { getLoggedInAccount } from "@/actions/auth";
import { redirect } from "next/navigation";
import redirects from "@/config/redirects";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const resp = await getLoggedInAccount();
  const account = resp?.data?.accounts[0];

  console.log(account);
  if (!account) {
    redirect(redirects.auth.login);
  }

  return (
    <>
      {children}
    </>
  );
}
