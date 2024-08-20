import { UpdateAccountForm } from "@/components/app/account/update-account-form"
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

export default function AccountSettingsPage() {
  return (
    <Tabs defaultValue="account" className="m-4 max-w-md">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="coming-soon" disabled>Coming Soon...</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click update account when you&apos;re done.
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            <UpdateAccountForm />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}