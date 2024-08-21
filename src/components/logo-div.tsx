import { ComponentPropsWithoutRef, FC } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import redirects from "@/config/redirects";

interface LogoDivProps extends Omit<ComponentPropsWithoutRef<typeof Link>, "href"> {
  href?: string
}

export const LogoDiv: FC<LogoDivProps> = ({ className, href = redirects.home, ...props }) => {
  return (
    <Link
      className={cn("flex flex-row items-center justify-center text-2xl font-bold", className)}
      href={href}
      {...props}
    >
      <span className="tracking-tight hover:cursor-pointer">
        wait
        <span className="text-primary">q</span>
      </span>
    </Link >
  );
};



export const SmallLogoDiv: FC<LogoDivProps> = ({ className, href = redirects.home, ...props }) => {
  return (
    <Link
      className={cn("flex flex-row items-center justify-center text-2xl font-bold", className)}
      href={href}
      {...props}
    >
      <span className="tracking-tight hover:cursor-pointer">
        w
        <span className="text-primary">q</span>
      </span>
    </Link >
  );
};

