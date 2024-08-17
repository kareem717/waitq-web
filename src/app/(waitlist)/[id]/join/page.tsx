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
import { validate as isValidUuid } from 'uuid';

export default async function JoinQueuePage({ params }: { params: { id: string } }) {
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