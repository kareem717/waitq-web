import { getLoggedInAccount } from "@/actions/auth";
import { redirect } from "next/navigation";
import redirects from "@/config/redirects";
import { cookies } from "next/headers";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //TODO: Fix this
cookies().getAll();

  const resp = await getLoggedInAccount();
  const account = resp?.data?.accounts[0];

  if (!account) {
    redirect(redirects.auth.login);
  }

  return (
    <>
      {children}
    </>
  );
}
