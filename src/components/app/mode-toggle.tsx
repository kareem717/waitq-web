"use client"

import { ComponentPropsWithoutRef, FC } from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useTheme } from "next-themes"
import { Icons } from "../icons"
import { cn } from "@/lib/utils"

export interface ModeToggleProps extends ComponentPropsWithoutRef<"div"> { }

export const ModeToggle: FC<ModeToggleProps> = ({ className, ...props }) => {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <div {...props} className={className}>
      <ToggleGroup type="single" className="w-full rounded-lg border p-1" value={resolvedTheme} >
        <ToggleGroupItem value="dark" className="w-full group" aria-label="Toggle dark mode" onClick={() => setTheme("dark")}>
          <Icons.moon className={cn("h-4 w-4 group-hover:text-foreground", resolvedTheme === "dark" ? "text-foreground" : "text-muted-foreground")} />
        </ToggleGroupItem>
        <ToggleGroupItem value="light" className="w-full group" aria-label="Toggle light mode" onClick={() => setTheme("light")}>
          <Icons.sun className={cn("h-4 w-4 group-hover:text-foreground", resolvedTheme === "light" ? "text-foreground" : "text-muted-foreground")} />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}