import { CreateWaitlistForm } from "@/components/app/waitlist/create-waitlist-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function CreateWaitlistPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full px-2">
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
  )
}