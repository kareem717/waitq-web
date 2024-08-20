import { getWaitlistAnalytics } from "@/actions/waitlist";
import { WaitlistAnalyticsChart } from "@/components/app/waitlist/emails/analytic-chart";
import { WaitlistEmailActions } from "@/components/app/waitlist/emails/email-actions";
import { WaitlistAnalytics } from "@/components/app/waitlist/emails/waitlist-analytics";

export default async function WaitlistEmailsPage({ params }: { params: { id: string } }) {
  const resp = await getWaitlistAnalytics({ waitlistId: params.id })

  if (!resp?.data) {
    throw new Error(resp?.serverError || "Something went wrong.");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Emails</h1>
      <WaitlistAnalytics data={resp.data} />
      <div className="flex md:flex-col gap-6 flex-col-reverse">
        <WaitlistAnalyticsChart data={resp.data.analytics} />
        <WaitlistEmailActions waitlistId={params.id} />
      </div>
    </div>
  )

}