import { getWaitlistByUrlAlias } from "@/actions/waitlist";
import { LeaveWaitlistForm } from "@/components/app/waitlist/forms/leave-waitlist-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

const getWaitlist = cache(async (urlAlias: string) => {
  const resp = await getWaitlistByUrlAlias({ urlAlias: urlAlias })

  if (!resp?.data) {
    if (resp?.serverError) {
      throw new Error(resp.serverError)
    }
    notFound()
  }

  const waitlist = resp.data?.publicWaitlist

  if (!waitlist || waitlist.deletedAt != null) {
    notFound()
  }

  return waitlist
})

export async function generateMetadata({ params }: { params: { urlAlias: string } }): Promise<Metadata> {
  const waitlist = await getWaitlist(params.urlAlias)

  return {
    title: `${waitlist.name} - Leave Waitlist`,
    description: `Leave the waitlist for ${waitlist.name}.`,
  }
}

export default async function UnsubscribePage({ params, searchParams }: { params: { alias: string }, searchParams: { ee: string } }) {
  const waitlist = await getWaitlist(params.alias)

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