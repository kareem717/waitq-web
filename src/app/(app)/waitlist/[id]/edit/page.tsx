import { EditWaitlistForm } from "@/components/app/waitlist/edit-waitlist-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getWaitlistById } from "@/actions/waitlist"

export default async function UpdateWaitlistPage({ params }: { params: { id: string } }) {
  const { waitlist } = await getWaitlistById(params.id)

  return (
    <div className="flex flex-col items-center justify-center w-full px-2">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Edit waitlist</CardTitle>
          <CardDescription>Edit a waitlist to update its settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <EditWaitlistForm waitlist={waitlist} />
        </CardContent>
      </Card>
    </div>
  )
}