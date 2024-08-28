import { getCachedAccount } from "@/app/(app)/layout"
import { UpdateAccountForm } from "@/components/app/settings/account/update-account-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function AccountSettingsPage() {
  const account = await getCachedAccount()

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