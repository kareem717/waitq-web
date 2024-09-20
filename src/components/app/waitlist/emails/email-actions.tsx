"use client";

import { ComponentPropsWithoutRef, FC, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { exportEmailsToCSV } from "@/actions/waitlist";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { saveAs } from 'file-saver';

export interface WaitlistEmailActionsProps extends ComponentPropsWithoutRef<typeof Card> {
  waitlistId: string
  hasData: boolean
}

export const WaitlistEmailActions: FC<WaitlistEmailActionsProps> = ({ waitlistId, className, hasData, ...props }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleExportToCSV = async () => {
    const resp = await exportEmailsToCSV({ waitlistId })
    if (resp?.data) {
      const blob = new Blob([resp.data], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, `${waitlistId}-${new Date().toISOString()}.csv`);
      toast.success("Done!", {
        description: "The email list has been exported to CSV.",
      })
      setIsDialogOpen(false)
    } else {
      toast.error("Something went wrong", {
        description: resp?.serverError || "An unknown error occurred",
      })
    }
  }

  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <CardTitle>Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" disabled={!hasData}>
              <Icons.fileDown className="mr-2 h-4 w-4" />
              Export to CSV
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Export to CSV</DialogTitle>
              <DialogDescription>
                Are you sure you want to export the email list to CSV?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleExportToCSV} disabled={!hasData}>Export</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button
          disabled
        >
          <Icons.mail className="mr-2 h-4 w-4" />
          Email Coming Soon...
        </Button>
      </CardContent>
    </Card>
  )
}