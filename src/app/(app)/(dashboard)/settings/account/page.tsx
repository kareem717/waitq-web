import { UpdateAccountForm } from "@/components/app/settings/account/update-account-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import createClient from "@/lib/utils/supabase/server";
import { getAccountByUserId } from "@/actions/auth";
import { redirect } from "next/navigation";
import redirects from "@/config/redirects";

export default async function AccountSettingsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect(redirects.auth.login);
  }

  const accountResp = await getAccountByUserId({ userId: user.id });
  const account = accountResp?.data;

  if (!account) {
    redirect(redirects.auth.createAccount);
  }


  return (
    <Card className="max-w-md h-min">
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>
          Make changes to your account here. Click update account when you&apos;re done.
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <UpdateAccountForm account={account} />
      </CardContent>
    </Card>
  )
}