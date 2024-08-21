import { ComponentPropsWithoutRef, FC } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import redirects from "@/config/redirects";
import Image from "next/image";
import ImageConfig from "@/config/image";

interface LogoDivProps extends Omit<ComponentPropsWithoutRef<typeof Link>, "href"> {
  href?: string
}

export const LogoDiv: FC<LogoDivProps> = ({ className, href = redirects.home, ...props }) => {
  return (
    <Link
      className={cn("flex flex-row items-baseline text-2xl font-bold", className)}
      href={href}
      {...props}
    >
      <Image src={ImageConfig.logo.large} alt="waitq Large Logo" width={80} height={40} />
    </Link >
  );
};



export const SmallLogoDiv: FC<LogoDivProps> = ({ className, href = redirects.home, ...props }) => {
  return (
    <Link
      className={cn("flex flex-row items-baseline text-2xl font-bold", className)}
      href={href}
      {...props}
    >
      <Image src={ImageConfig.logo.small} alt="waitq Small Logo" width={40} height={40} />
    </Link >
  );
};

