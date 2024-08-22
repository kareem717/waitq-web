import { getLoggedInAccount } from "@/actions/auth"
import { UpdateAccountForm } from "@/components/app/account/update-account-form"
import { BillingPortalButton } from "@/components/app/settings/billing"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { cookies } from "next/headers"

export default async function AccountSettingsPage() {
  cookies().getAll()

  const accountResp = await getLoggedInAccount()
  const account = accountResp?.data

  if (!account) {
    console.error(accountResp?.serverError)
    console.error(accountResp?.validationErrors)

    throw new Error("Account not found")
  }

  return (
    <Tabs defaultValue="profile" className="m-4 max-w-md">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <Card>
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
      </TabsContent>
      <TabsContent value="billing">
        <Card>
          <CardHeader>
            <CardTitle>Billing</CardTitle>
            <CardDescription>
              Manage your billing information here.
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            <BillingPortalButton accountId={account.id} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}