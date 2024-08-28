import { redirect } from "next/navigation";
import redirects from "@/config/redirects";
import AuthProvider from "@/components/providers/auth-provider";
import createClient from "@/lib/utils/supabase/server";
import { getAccountByUserId } from "@/actions/auth";
import { cache } from 'react';
import { getSubscriptionByAccountId } from "@/actions/billing";

export const getCachedUser = cache(async () => {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect(redirects.auth.login);
  }

  return user;
});

export const getCachedAccount = cache(async () => {
  const user = await getCachedUser()

  const accountResp = await getAccountByUserId({ userId: user.id });
  const account = accountResp?.data;

  if (!account) {
    redirect(redirects.auth.createAccount);
  }

  return account;
});

export const getCachedSubscription = cache(async () => {
  const account = await getCachedAccount()

  const subscription = await getSubscriptionByAccountId({ accountId: account.id })

  // skip error cuz i dont care
  return subscription?.data
})

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCachedUser();
  const account = await getCachedAccount();

  return (
    <AuthProvider user={user} account={account}>
      {children}
    </AuthProvider>
  );
}
