"use client"

import { ComponentPropsWithoutRef, FC, useState } from "react"
import { Waitlist } from "@/lib/sdk"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { Icons } from "@/components/icons"
import { toast } from "sonner"

export interface DeleteWaitlistCardProps extends ComponentPropsWithoutRef<typeof Card> {
  waitlist: Waitlist
}

export const DeleteWaitlistCard: FC<DeleteWaitlistCardProps> = ({ waitlist, ...props }) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteWaitlist = async () => {
    setIsDeleting(true)
    //pause for 3 seconds
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsDeleting(false)

    toast.success("Done!", {
      description: "The waitlist has been deleted.",
    })
  }

  return (
    <Card {...props} className="w-full">
      <CardHeader>
        <CardTitle>Destructive Action</CardTitle>
        <CardDescription>
          This will delete the waitlist and all of its data.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive" className="w-full">Delete Waitlist</Button>
          </DialogTrigger>
          <DialogContent >
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone and the waitlist will be lost. The only way to recover it is to contact support.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild disabled={isDeleting}>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button variant="destructive" onClick={() => handleDeleteWaitlist()} disabled={isDeleting}>
                {isDeleting && <Icons.spinner className="animate-spin w-4 h-4 mr-2" />}
                Delete Waitlist
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}