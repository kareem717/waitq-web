import { UpdateAccountForm } from "@/components/app/account/update-account-form"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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