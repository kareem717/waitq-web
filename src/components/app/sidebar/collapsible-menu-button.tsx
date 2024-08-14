"use client";

import Link from "next/link";
import { useState } from "react";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

interface CollapseMenuButtonProps {
  icon: keyof typeof Icons;
  label: string;
  active: boolean;
  submenus: Submenu[];
}

export function CollapseMenuButton({
  icon,
  label,
  active,
  submenus,
}: CollapseMenuButtonProps) {
  const isSubmenuActive = submenus.some((submenu) => submenu.active);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive);
  const Icon = Icons[icon];

  return (
    <Collapsible
      open={isCollapsed}
      onOpenChange={setIsCollapsed}
      className="w-full"
    >
      <CollapsibleTrigger
        className="[&[data-state=open]>div>div>svg]:rotate-180 mb-1"
        asChild
      >
        <Button
          variant={active ? "secondary" : "ghost"}
          className={cn("w-full justify-start h-10", (active || isSubmenuActive) ? "text-foreground" : "text-muted-foreground")}
        >
          <div className="w-full items-center flex justify-between">
            <div className="flex items-center">
              <span className="mr-4">
                <Icon size={18} />
              </span>
              <p
                className="max-w-[150px] truncate translate-x-0 opacity-100"
              >
                {label}
              </p>
            </div>
            <div
              className="whitespace-nowrap translate-x-0 opacity-100"
            >
              <Icons.chevronDown
                className="transition-transform duration-200 w-5 h-5"
              />
            </div>
          </div>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        {submenus.map(({ href, label, active }, index) => (
          <Button
            key={index}
            variant={active ? "secondary" : "ghost"}
            className={cn("w-full justify-start h-10 mb-1 hover:text-foreground", active ? "text-foreground" : "text-muted-foreground")}
            asChild
          >
            <Link href={href}>
              <span className="mr-4 ml-2">
                <Icons.dot className="w-5 h-5" />
              </span>
              <p
                className="max-w-[170px] truncate translate-x-0 opacity-100"
              >
                {label}
              </p>
            </Link>
          </Button>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}