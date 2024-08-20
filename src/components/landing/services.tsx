import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import landing, { ProService } from "@/config/landing";
import { ComponentPropsWithoutRef, FC } from "react";
import { cn } from "@/lib/utils";

export interface ServicesProps extends ComponentPropsWithoutRef<"div"> { }

export const Services: FC<ServicesProps> = ({ className, ...props }) => {
  const { title, subtitle, description, list } = landing.services;
  return (
    <div className={cn("container py-24 sm:py-32", className)} {...props} >
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        {title}
      </h2>
      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        {subtitle}
      </h2>
      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        {description}
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full lg:w-[60%] mx-auto">
        {list.map(({ title, description, pro }) => (
          <Card
            key={title}
            className="bg-muted/60 dark:bg-card h-full relative"
          >
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <Badge
              data-pro={ProService.YES === pro}
              variant="secondary"
              className="absolute -top-2 -right-3 data-[pro=false]:hidden"
            >
              PRO
            </Badge>
          </Card>
        ))}
      </div>
    </div>
  );
};