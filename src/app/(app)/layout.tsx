import { Input } from "@/components/ui/input"
import { MobileSidebar } from "@/components/app/sidebar"
import { Sidebar } from "@/components/app/sidebar"
import { Icons } from "@/components/icons"
import AuthProvider from "@/components/providers/auth-provider";
import { getUser, getAccountByUserId } from "@/actions/auth";
import { redirect } from "next/navigation";
import redirects from "@/config/redirects";
import { getWaitlistByAccountId } from "@/actions/waitlist";
import { getSubscriptionByAccountId } from "@/actions/subscription";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const resp = await getUser();
  const user = resp?.data;

  if (!user) {
    redirect(redirects.auth.login);
  }

  const accResp = await getAccountByUserId({
    userId: user.id,
  });
  const account = accResp?.data?.accounts[0];

  if (!account) {
    redirect(redirects.auth.createAccount);
  }

  const subscriptionResp = await getSubscriptionByAccountId({
    accountId: account.id,
  });
  if (subscriptionResp?.serverError || subscriptionResp?.validationErrors) {
    throw new Error(subscriptionResp?.serverError || "Something went wrong.");
  }

  const waitlistsResp = await getWaitlistByAccountId({
    accountId: account.id,
    paginationParams: {
      page: 1,
      pageSize: 100,
      includeDeleted: false
    },
  });
  if (waitlistsResp?.serverError || waitlistsResp?.validationErrors) {
    throw new Error(waitlistsResp?.serverError || "Something went wrong.");
  }

  return (
    <AuthProvider user={user} account={account} subscription={subscriptionResp?.data?.subscriptionRelationship}>
      <div className="relative grid w-full h-full grid-rows-[auto_1fr] md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] overflow-hidden">
        <Sidebar className="row-span-full" waitlists={waitlistsResp?.data?.waitlists || []} accountId={account.id} />
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <MobileSidebar waitlists={waitlistsResp?.data?.waitlists || []} accountId={account.id} />
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
