"use client";

import { ComponentPropsWithoutRef, FC } from "react"
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { WaitlistAnalytics } from "@/lib/sdk";

const chartConfig = {
  active: {
    label: "Active",
    color: "hsl(var(--primary))",
  },
  unsubscribed: {
    label: "Unsubscribed",
    color: "hsl(var(--destructive))",
  },
  deleted: {
    label: "Deleted",
    color: "hsl(var(--foreground))",
  },
} satisfies ChartConfig

export interface WaitlistAnalyticsChartProps extends ComponentPropsWithoutRef<typeof Card> {
  data: WaitlistAnalytics
}

export const WaitlistAnalyticsChart: FC<WaitlistAnalyticsChartProps> = ({ className, data, ...props }) => {
  const { activeEmails, unsubscribedEmails, deletedEmails, totalEmails } = data

  const hasData = totalEmails > 0

  const chartData = [
    { name: 'Active', value: activeEmails, color: chartConfig.active.color },
    { name: 'Unsubscribed', value: unsubscribedEmails, color: chartConfig.unsubscribed.color },
    { name: 'Deleted', value: deletedEmails, color: chartConfig.deleted.color },
  ]

  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <CardTitle>Email Distribution</CardTitle>
      </CardHeader>
      {hasData ? (
        <CardContent className="flex flex-col items-center justify-center h-full w-full">
          <ChartContainer config={chartConfig} className="flex-grow h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius="50%"
                  outerRadius="70%"
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="flex justify-center space-x-4 mt-4">
            {chartData.map((entry, index) => (
              <div key={`legend-${index}`} className="flex items-center">
                <div className="w-3 h-3 mr-1" style={{ backgroundColor: entry.color }}></div>
                <span className="text-sm">{entry.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      ) : (
        <CardContent className="flex flex-col items-center justify-center h-full w-full">
          <span className="text-muted-foreground text-sm">No data</span>
        </CardContent>
      )}
    </Card>
  )
}