import { ComponentPropsWithoutRef, FC } from "react"
import { GetWaitlistAnalyticsOutputBody } from "@/lib/sdk"
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface WaitlistAnalyticsProps extends ComponentPropsWithoutRef<'div'> {
  data: GetWaitlistAnalyticsOutputBody
}

export const WaitlistAnalytics: FC<WaitlistAnalyticsProps> = ({ className, data, ...props }) => {
  const {
    analytics: {
      activeEmails,
      unsubscribedEmails,
      deletedEmails,
      totalEmails,
    }
  } = data

  return (
    <div className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3", className)} {...props}>
      <Card className="sm:col-span-2 lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Emails</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {activeEmails}
            <span className="text-xs text-muted-foreground">
              / {totalEmails}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {((activeEmails / totalEmails) * 100).toFixed(1)}% of total
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unsubscribed Emails</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {unsubscribedEmails}
            <span className="text-xs text-muted-foreground">
              / {totalEmails}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {((unsubscribedEmails / totalEmails) * 100).toFixed(1)}% of total
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Deleted Emails</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {deletedEmails}
            <span className="text-xs text-muted-foreground">
              / {totalEmails}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {((deletedEmails / totalEmails) * 100).toFixed(1)}% of total
          </p>
        </CardContent>
      </Card>
    </div>
  )
}