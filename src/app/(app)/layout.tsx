import { redirect } from "next/navigation";
import redirects from "@/config/redirects";
import AuthProvider from "@/components/providers/auth-provider";
import createClient from "@/lib/utils/supabase/server";
import { getAccountByUserId } from "@/actions/auth";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(redirects.auth.login);
  }

  const accountResp = await getAccountByUserId({ userId: user.id });
  const account = accountResp?.data;

  if (!account) {
    redirect(redirects.auth.createAccount);
  }

  return (
    <AuthProvider user={user ?? undefined} account={account}>
      {children}
    </AuthProvider>
  );
}
