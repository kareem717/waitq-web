import { getWaitlistById } from "@/actions/waitlist";
import { JoinWaitlistForm } from "@/components/app/waitlist/join-waitlist-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { notFound } from "next/navigation";

export default async function JoinQueuePage({ params }: { params: { id: string } }) {
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
          <CardTitle>Queue for {waitlist.name}</CardTitle>
          <CardDescription>Join the waitlist to stay updated.</CardDescription>
        </CardHeader>
        <CardContent>
          <JoinWaitlistForm waitlistId={waitlist.id} />
        </CardContent>
      </Card>
    </main>
  );
}