import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "../icons";
import landing from "@/config/landing";
import { FC, ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface FeaturesProps extends ComponentPropsWithoutRef<"div"> { }

export const Features: FC<FeaturesProps> = ({ className, ...props }) => {
  const { title, subtitle, description, list } = landing.features;

  return (
    <div className={cn("container py-24 sm:py-32", className)} {...props}>
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        {title}
      </h2>
      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        {subtitle}
      </h2>
      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        {description}
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map(({ icon, title, description }, index) => {
          const Icon = Icons[icon as keyof typeof Icons]
          return (
            <div key={index}>
              <Card className="h-full bg-background border-0 shadow-none">
                <CardHeader className="flex justify-center items-center">
                  <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                    <Icon
                      size={24}
                      color="hsl(var(--primary))"
                      className="text-primary"
                    />
                  </div>

                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-center">
                  {description}
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  );
};