import { CreateWaitlistForm } from "@/components/app/waitlist/forms/create-waitlist-form"
import { LogoDiv } from "@/components/logo-div"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create a waitlist",
};

export default function CreateWaitlistPage() {
  return (
    <div className="flex flex-col justify-center w-full h-full p-2 gap-16">
      <div className="flex flex-col items-start w-full">
        <LogoDiv />
      </div>
      <div className="flex flex-col items-center w-full h-full">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Create a waitlist</CardTitle>
            <CardDescription>Create a new waitlist to start collecting emails.</CardDescription>
          </CardHeader>
          <CardContent>
            <CreateWaitlistForm />
          </CardContent>
        </Card>
      </div>
    </div>

  )
}