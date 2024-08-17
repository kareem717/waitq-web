'use client'

import { ComponentPropsWithoutRef, FC, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import NavigationConfig from "@/config/navigation"
import { usePathname } from "next/navigation";
import { CollapseMenuButton } from "./collapsible-menu-button"
import { Icons } from "@/components/icons";
import { getWaitlistByAccountId } from "@/actions/waitlist";
import { useAuth } from "@/components/providers/auth-provider";
import { Waitlist } from "@/lib/sdk";
import redirects from "@/config/redirects";
import { type Menu as MenuType, type Submenu as SubmenuType } from "@/config/navigation";

type Submenu = SubmenuType & {
  active: boolean;
}

type SidebarMenu = MenuType & {
  active: boolean;
  submenus: Submenu[];
}

type Group = {
  groupLabel: string;
  menus: SidebarMenu[];
}

//TODO: Clean up this code
const getMenuList = async (pathname: string, accountId: string) => {
  const processSubmenus = (submenus: SubmenuType[], pathname: string) =>
    submenus.map(submenu => ({
      ...submenu,
      active: pathname === submenu.pathIdentifier,
    }));

  const processWaitlists = async (accountId: string, pathname: string): Promise<SidebarMenu[]> => {
    const waitlists = await getWaitlistByAccountId(accountId, {
      page: 1,
      pageSize: 999,
      includeDeleted: false,
    });

    return waitlists.waitlists.flatMap(waitlist => {
      const index = redirects.app.waitlist.index.replace(":id", waitlist.id);
      const settings = redirects.app.waitlist.settings.replace(":id", waitlist.id);
      const edit = redirects.app.waitlist.edit.replace(":id", waitlist.id);
      const emails = redirects.app.waitlist.emails.replace(":id", waitlist.id);

      return [
        {
          href: "",
          label: waitlist.name,
          pathIdentifier: index,
          active: pathname === index || pathname === settings,
          icon: "mail",
          submenus: [{
            label: "Settings",
            href: settings,
            pathIdentifier: settings,
            active: pathname === settings,
          },
          {
            label: "Edit",
            href: edit,
            pathIdentifier: edit,
            active: pathname === edit,
          },
          {
            label: "Emails",
            href: emails,
            pathIdentifier: emails,
            active: pathname === emails,
          },
          ],
        },
      ];
    });
  };

  const processMenus = async (group: Group, pathname: string, accountId: string) => {
    const menus = await Promise.all(group.menus.map(async menu => {
      const submenus = processSubmenus(menu.submenus, pathname);

      return {
        ...menu,
        active: pathname === menu.pathIdentifier, // Add active property
        submenus,
      };
    }));

    if (group.groupLabel === "Waitlists") {
      const waitlistMenus = await processWaitlists(accountId, pathname);
      return {
        ...group,
        menus: [...menus, ...waitlistMenus],
      };
    }

    return {
      ...group,
      menus,
    };
  };

  const menuList = await Promise.all(
    NavigationConfig.map(group => processMenus({
      ...group,
      menus: group.menus.map(menu => ({
        ...menu,
        active: false, // Initialize active property
        submenus: menu.submenus.map(submenu => ({
          ...submenu,
          active: false, // Initialize active property
        }))
      }))
    }, pathname, accountId))
  );

  return menuList;
};

export interface MenuProps extends ComponentPropsWithoutRef<"nav"> {
}

export const Menu: FC<MenuProps> = ({ className, ...props }) => {
  const { account } = useAuth();
  const pathname = usePathname();
  const [menuList, setMenuList] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  if (!account) throw new Error("Account not found");

  useEffect(() => {
    const fetchMenuList = async () => {
      const menuList = await getMenuList(pathname, account.id)
      setMenuList(menuList)
      setIsLoading(false)
      setHasMore(menuList.length > 3)
    }

    fetchMenuList()
  }, [account, pathname])

  if (isLoading) return <div>Loading...</div>

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