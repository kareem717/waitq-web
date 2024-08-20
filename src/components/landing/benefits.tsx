import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "../icons";
import { ComponentPropsWithoutRef, FC } from "react";
import landing from "@/config/landing";
import { cn } from "@/lib/utils";

export interface BenefitsProps extends ComponentPropsWithoutRef<"div"> { }

export const Benefits: FC<BenefitsProps> = ({ className, ...props }) => {
  const { title, subtitle, description, list } = landing.benefits;

  return (
    <div className={cn("container py-24 sm:py-32", className)} {...props}>
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
        <div>
          <h2 className="text-lg text-primary mb-2 tracking-wider">
            {title}
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {subtitle}
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            {description}
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-4 w-full">
          {list.map(({ icon, title, description }, index) => {
            const Icon = Icons[icon as keyof typeof Icons]
            return (
              <Card
                key={title}
                className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number"
              >
                <CardHeader>
                  <div className="flex justify-between">
                    <Icon
                      size={32}
                      color="hsl(var(--primary))"
                      className="mb-6 text-primary"
                    />
                    <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                      0{index + 1}
                    </span>
                  </div>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  {description}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  );
};