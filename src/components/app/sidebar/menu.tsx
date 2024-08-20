import { ComponentPropsWithoutRef, FC } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import NavigationConfig from "@/config/navigation"
import { CollapseMenuButton } from "./collapsible-menu-button"
import { Icons } from "@/components/icons";
import { headers } from "next/headers"

export interface MenuProps extends ComponentPropsWithoutRef<"nav"> { }

export const Menu: FC<MenuProps> = ({ className, ...props }) => {
  const headersList = headers();
  const fullUrl = headersList.get('referer') || "";
  const path = fullUrl ? new URL(fullUrl).pathname : "";

  const menuList = NavigationConfig.map(group => ({
    ...group,
    menus: group.menus.map(menu => ({
      ...menu,
      active: path === menu.pathIdentifier,
      submenus: menu.submenus.map((submenu) => ({
        ...submenu,
        active: path === submenu.pathIdentifier,
      })),
    })),
  }));

  return (
    <nav className={cn("grid items-start px-2 text-sm font-medium lg:px-4", className)} {...props}>
      {menuList.map(({ groupLabel, menus }, index) => (
        <li className={cn("w-full list-none", groupLabel ? "pt-5" : "")} key={index}>
          {groupLabel ? (
            <p className="text-sm font-medium  px-4 pb-2 max-w-[248px] truncate">
              {groupLabel}
            </p>
          ) : (
            <p className="pb-2"></p>
          )}
          {menus.map(
            ({ href, label, icon, active, submenus }, index) => {
              if (submenus.length === 0) {
                const Icon = Icons[icon]
                return (
                  <div className="w-full" key={index}>
                    <TooltipProvider disableHoverableContent>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <Button
                            variant={active ? "secondary" : "ghost"}
                            className={cn("w-full justify-start h-10 mb-1 hover:text-foreground", active ? "text-foreground" : "text-muted-foreground")}
                            asChild
                          >
                            <Link href={href}>
                              <span
                                className={cn("mr-4")}
                              >
                                <Icon className="h-5 w-5" />
                              </span>
                              <p
                                className="max-w-[200px] truncate translate-x-0 opacity-100"
                              >
                                {label}
                              </p>
                            </Link>
                          </Button>
                        </TooltipTrigger>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )
              } else {
                return (
                  <div className="w-full" key={index}>
                    <CollapseMenuButton
                      icon={icon}
                      label={label}
                      active={active}
                      submenus={submenus}
                    />
                  </div>
                )
              }
            }
          )}
        </li>
      ))
      }
    </nav >
  )
}