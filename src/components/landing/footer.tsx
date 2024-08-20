import { ComponentPropsWithoutRef, FC } from "react"
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { LogoDiv } from "../logo-div";
import landingConfig from "@/config/landing";
import { cn } from "@/lib/utils";

export interface LandingFooterProps extends ComponentPropsWithoutRef<"footer"> { };

export const LandingFooter: FC<LandingFooterProps> = ({ className, ...props }) => {
  const { footerGroups } = landingConfig;

  return (
    <footer className={cn("container py-24 sm:py-32 shadow-sm dark:shadow-inner", className)} {...props}>
      <div className="p-10 bg-card border rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
          <div className="col-span-full xl:col-span-2">
            <LogoDiv />
          </div>
          {footerGroups.map((group, index) => (
            <div className="flex flex-col gap-2" key={index}>
              <h3 className="font-bold text-lg">{group.label}</h3>
              {group.items.map((item, index) => (
                <div key={index}>
                  <Link href={item.href} className="opacity-60 hover:opacity-100">
                    {item.label}
                  </Link>
                </div>
              ))}

            </div>
          ))}
        </div>

        <Separator className="my-6" />
        <section className="">
          <h3>
            &copy; 2024 <span className="font-bold text-primary">Yakubu LLC</span>
          </h3>
        </section>
      </div>
    </footer>
  );
};