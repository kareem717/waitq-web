import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ThemeImage } from "./theme-image";
import landing from "@/config/landing";
import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, FC } from "react";

export interface HeroProps extends ComponentPropsWithoutRef<"div"> { }

export const Hero: FC<HeroProps> = ({ className, ...props }) => {
  const { title, description, primaryCTA, secondaryCTA, image, update } =
    landing.hero;

  return (
    <div className={cn("w-full px-2", className)} {...props}>
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
        <div className="text-center space-y-8">
          <Badge variant="outline" className="text-sm py-2">
            <span className="mr-2 text-primary">
              <Badge>New</Badge>
            </span>
            <span> {update} </span>
          </Badge>
          <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
            <h1>
              {title.prefix}
              <span className="text-transparent px-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
                {title.highlight}
              </span>
              {title.suffix}
            </h1>
          </div>
          <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
            {description}
          </p>
          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Link
              href={primaryCTA.href}
              className={cn(
                buttonVariants(),
                "w-5/6 md:w-1/4 font-bold group/arrow"
              )}
            >
              {secondaryCTA.label}
              <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
            </Link>
            <Link
              href={secondaryCTA.href}
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "w-5/6 md:w-1/4 font-bold"
              )}
            >
              {secondaryCTA.label}
            </Link>
          </div>
        </div>
        <div className="relative group mt-14">
          <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl"></div>
          <ThemeImage
            width={1200}
            height={1200}
            className="w-full md:w-[1200px] mx-auto rounded-lg relative rouded-lg leading-none flex items-center border border-t-2 border-secondary  border-t-primary/30"
            src={image.src}
            alt={image.alt}
          />
          <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};