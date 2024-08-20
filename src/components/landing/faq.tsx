import { ComponentPropsWithoutRef, FC } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import landing from "@/config/landing";
import { cn } from "@/lib/utils";

export interface faqProps extends ComponentPropsWithoutRef<"div"> { };

export const FAQ: FC<faqProps> = ({ className, ...props }) => {
  const { title, subtitle, list } = landing.faq;

  return (
    <div id="faq" className={cn("container md:w-[700px] py-24 sm:py-32", className)} {...props}>
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          {title}
        </h2>
        <h2 className="text-3xl md:text-4xl text-center font-bold">
          {subtitle}
        </h2>
      </div>
      <Accordion type="single" collapsible>
        {list.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value} >
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};