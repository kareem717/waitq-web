import { getWaitlistById } from "@/actions/waitlist";
import { LeaveWaitlistForm } from "@/components/app/waitlist/leave-waitlist-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { notFound } from "next/navigation";

export default async function UnsubscribePage({ params, searchParams }: { params: { id: string }, searchParams: { ee: string } }) {
  const resp = await getWaitlistById({ id: params.id })

  if (!resp?.data) {
    if (resp?.serverError) {
      throw new Error(resp.serverError)
    }

    notFound()
  }

  const waitlist = resp.data?.waitlist

  if (!waitlist || waitlist.deletedAt != null) {
    notFound()
  }

  return (
    <main className="flex flex-col items-center justify-center h-full w-full">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Are you sure?</CardTitle>
          <CardDescription>By clicking leave, you will be removed from the waitlist for {waitlist.name}.</CardDescription>
        </CardHeader>
        <CardContent>
          <LeaveWaitlistForm waitlistId={waitlist.id} encodedEmail={searchParams.ee} />
        </CardContent>
      </Card>
    </main>
  );
}