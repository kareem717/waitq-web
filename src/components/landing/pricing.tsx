import { Pricing } from "@/components/app/pricing";
import { ComponentPropsWithoutRef, FC } from "react";

export interface PricingSectionProps extends ComponentPropsWithoutRef<"section"> {
}

export const PricingSection: FC<PricingSectionProps> = ({ ...props }) => {
  return (
    <section {...props}>
      <Pricing  cta="Get Started" />
    </section>
  );
};