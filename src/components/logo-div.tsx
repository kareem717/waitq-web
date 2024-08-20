import { ComponentPropsWithoutRef, FC } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import redirects from "@/config/redirects";

interface LogoDivProps extends ComponentPropsWithoutRef<"h1"> { }

export const LogoDiv: FC<LogoDivProps> = ({ className, ...props }) => {
  return (
    <Link
      href={redirects.home}
      className="flex flex-row items-baseline text-2xl font-bold"
    >
      <h1 className={cn("relative flex flex-row items-baseline text-2xl font-bold", className)}>
        <span className="sr-only">waitq</span>
        <span className="tracking-tight hover:cursor-pointer">
          wait
          <span className="text-primary">q</span>
        </span>
      </h1>
    </Link >
  );
};

