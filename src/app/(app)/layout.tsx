import { Input } from "@/components/ui/input"
import { MobileSidebar } from "@/components/app/sidebar"
import { Sidebar } from "@/components/app/sidebar"
import { Icons } from "@/components/icons"
import AuthProvider from "@/components/providers/auth-provider";
import supabase from "@/lib/utils/supabase/server";
import { getAccount } from "@/actions/account";
import { redirect } from "next/navigation";
import redirects from "@/config/redirects";
import { Account } from "@/lib/sdk";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sb = supabase();
  const { data } = await sb.auth.getUser();

  let account: Account | null = null;

  if (data?.user) {
    const resp = await getAccount(data.user.id);

    switch (resp.accounts.length) {
      case 0:
        redirect(redirects.auth.createAccount);
      case 1:
        account = resp.accounts[0];
        break;
      default:
        throw new Error("Something went wrong.");
    }
  } else {
    redirect(redirects.auth.login);
  }

  return (
    <AuthProvider user={data?.user} account={account}>

      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <MobileSidebar />
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
          <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}
