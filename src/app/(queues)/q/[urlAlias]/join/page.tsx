import { getWaitlistByUrlAlias } from "@/actions/waitlist";
import { JoinWaitlistForm } from "@/components/app/waitlist/forms/join-waitlist-form";
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
    title: `${waitlist.name} - Join Waitlist`,
    description: `Join the waitlist for ${waitlist.name}.`,
  }
}

export default async function JoinQueuePage({ params }: { params: { urlAlias: string } }) {
  const waitlist = await getWaitlist(params.urlAlias)

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