import { ComponentPropsWithoutRef, FC } from "react";
import { cn } from "@/lib/utils";

interface LogoDivProps extends ComponentPropsWithoutRef<"h1"> { }

export const LogoDiv: FC<LogoDivProps> = ({ className, ...props }) => {
  return (
    <h1 className={cn("relative flex flex-row items-baseline text-2xl font-bold", className)}>
      <span className="sr-only">waitq</span>
      <span className="tracking-tight hover:cursor-pointer">
        wait
        <span className="text-primary">q</span>
      </span>
    </h1>
  );
};

