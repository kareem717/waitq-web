import { EditWaitlistForm } from "@/components/app/waitlist/forms/edit-waitlist-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getWaitlistById } from "@/actions/waitlist"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: "Edit",
  description: "Edit a waitlist to update its settings.",
}

export default async function UpdateWaitlistPage({ params }: { params: { id: string } }) {
  const resp = await getWaitlistById({ waitlistId: params.id })

  const waitlist = resp?.data?.waitlist

  if (!waitlist) {
    throw new Error(resp?.serverError || "Something went wrong.")
  }

  return (
    <div className="flex flex-col items-center justify-center w-full px-2">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Edit waitlist</CardTitle>
          <CardDescription>Edit a waitlist to update its settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <EditWaitlistForm
            waitlist={waitlist}
          />
        </CardContent>
      </Card>
    </div>
  )
}