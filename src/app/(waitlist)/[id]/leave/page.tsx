import { getWaitlistById } from "@/actions/waitlist";
import { JoinWaitlistForm } from "@/components/app/waitlist/join-waitlist-form";
import { LeaveWaitlistForm } from "@/components/app/waitlist/leave-waitlist-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { notFound } from "next/navigation";
import { validate as isValidUuid } from 'uuid';


export default async function UnsubscribePage({ params, searchParams }: { params: { id: string }, searchParams: { ee: string } }) {
  if (!isValidUuid(params.id)) {
    notFound();
  }

  const { waitlist } = await getWaitlistById(params.id)

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