import { Input } from "@/components/ui/input"
import { MobileSidebar } from "@/components/app/sidebar"
import { Sidebar } from "@/components/app/sidebar"
import { Icons } from "@/components/icons"
import AuthProvider from "@/components/providers/auth-provider";
import supabase from "@/lib/utils/supabase/server";
import { getAccountByUserId } from "@/actions/account";
import { redirect } from "next/navigation";
import redirects from "@/config/redirects";
import { Account } from "@/lib/sdk";
import { getWaitlistByAccountId } from "@/actions/waitlist";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sb = supabase();
  const { data } = await sb.auth.getUser();

  let account: Account | null = null;

  if (data?.user) {
    const resp = await getAccountByUserId({ userId: data.user.id });

    switch (resp?.data?.accounts.length) {
      case 0:
        redirect(redirects.auth.createAccount);
      case 1:
        account = resp.data.accounts[0];
        break;
      default:
        throw new Error(resp?.serverError || "Something went wrong.");
    }
  } else {
    redirect(redirects.auth.login);
  }

  const resp = await getWaitlistByAccountId({
    accountId: account?.id,
    paginationParams: {
      page: 1,
      pageSize: 100,
      includeDeleted: false
    },
  });

  const waitlists = resp?.data?.waitlists;

  if (waitlists === undefined) {
    throw new Error(resp?.serverError || "Something went wrong.");
  }

  return (
    <AuthProvider user={data?.user} account={account}>
      <div className="relative grid w-full h-full grid-rows-[auto_1fr] md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] overflow-hidden">
        <Sidebar className="row-span-full" waitlists={waitlists} accountId={account.id} />
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <MobileSidebar waitlists={waitlists} accountId={account.id} />
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Icons.search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
        </header>
        <div className="flex flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </AuthProvider>
  );
}
