"use client";

import { Icons } from "@/components/icons";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, FC } from "react"
import { usePriceToggle } from "./use-duration-toggle"

export interface DurationToggleProps extends ComponentPropsWithoutRef<"div"> {
  defaultDuration: "yearly" | "monthly"
  durationInsentive?: string
};

export const DurationToggle: FC<DurationToggleProps> = ({ className, defaultDuration, durationInsentive, ...props }) => {
  const { isAnnual, setIsAnnual } = usePriceToggle()

  const handleToggle = (value: "yearly" | "monthly") => {
    setIsAnnual(value === "yearly")
  }

  return (
    <div className={cn(className, "flex items-center gap-2 w-full justify-center pb-14")} {...props}>
      <ToggleGroup type="single" value={isAnnual ? "yearly" : "monthly"} onValueChange={handleToggle}>
        <ToggleGroupItem value="monthly" className="text-md">Monthly</ToggleGroupItem>
        <ToggleGroupItem value="yearly" className="flex flex-row items-center justify-center gap-1 text-md" >
          {durationInsentive && (
            <span className="flex items-center justify-center text-xs gap-[2px] border-full bg-foreground/10 rounded-full px-2">
              <Icons.sparkles className="text-yellow-600 fill-current size-[10px]" />
              {durationInsentive}
            </span>
          )}
          Yearly
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
