import { WaitlistAPIKeyDisplay } from "@/components/app/waitlist/settings/key-display"
import { WaitlistJWTDisplay } from "@/components/app/waitlist/settings/jwt-display"
import { getWaitlistById } from "@/actions/waitlist"
import { DeleteWaitlistCard } from "@/components/app/waitlist/settings/delete-waitlist"

export default async function WaitlistSettings({ params }: { params: { id: string } }) {
  const { waitlist } = await getWaitlistById(params.id)

  return (
    <div className="flex flex-col items-start justify-center w-full gap-10 -mt-8">
      <h1 className="text-3xl font-bold">Waitlist API Settings</h1>
      <main className="flex flex-col gap-10 md:gap-16 items-center justify-center w-full">
        <WaitlistAPIKeyDisplay waitlist={waitlist} />
        <WaitlistJWTDisplay waitlist={waitlist} />
        <DeleteWaitlistCard waitlist={waitlist} />
      </main>
    </div>
  )
}