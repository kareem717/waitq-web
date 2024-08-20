import { ComponentPropsWithoutRef, FC } from "react"
import { cn, timeSince } from "@/lib/utils"
import Link from "next/link";
import redirects from "@/config/redirects";

export interface WaitlistIndexCardProps extends ComponentPropsWithoutRef<"div"> {
  waitlistId: string
  name: string
  createdAt: Date
};

export const WaitlistIndexCard: FC<WaitlistIndexCardProps> = ({ className, waitlistId, name, createdAt, ...props }) => {

  return (
    <Link href={redirects.app.waitlist.emails.replace(":id", waitlistId)}>
      <div className={cn("bg-card border shadow-sm rounded-md p-4 aspect-square h-full w-full flex flex-col justify-between items-start", className)}>
        <div className="text-lg font-bold">
          {name}
        </div>
        <span className="text-xs text-muted-foreground">
          Created {timeSince(createdAt)}
        </span>
      </div>
    </Link>
  );
};