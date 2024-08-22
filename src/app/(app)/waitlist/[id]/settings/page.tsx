import { WaitlistAPIKeyDisplay } from "@/components/app/waitlist/settings/key-display"
import { WaitlistJWTDisplay } from "@/components/app/waitlist/settings/jwt-display"
import { getWaitlistById } from "@/actions/waitlist"
import { DeleteWaitlistCard } from "@/components/app/waitlist/settings/delete-waitlist"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Settings",
  description: "View and edit waitlist settings.",
}

export default async function WaitlistSettings({ params }: { params: { id: string } }) {
  const resp = await getWaitlistById({ waitlistId: params.id })

  if (!resp?.data) {
    throw new Error(resp?.serverError || "Something went wrong.");
  }

  const waitlist = resp.data.waitlist

  return (
    <div className="flex flex-col items-start justify-center w-full gap-10">
      <h1 className="text-3xl font-bold">Waitlist API Settings</h1>
      <main className="flex flex-col gap-10 md:gap-16 items-center justify-center w-full">
        <WaitlistAPIKeyDisplay waitlist={waitlist} />
        <WaitlistJWTDisplay waitlist={waitlist} />
        <DeleteWaitlistCard waitlistId={waitlist.id} />
      </main>
    </div>
  )
}