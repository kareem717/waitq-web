import { ComponentPropsWithoutRef, FC } from "react";
interface LogoDivProps extends ComponentPropsWithoutRef<"div"> { }

export const LogoDiv: FC<LogoDivProps> = ({ ...props }) => {
  return (
    <div {...props}>
      <a className="flex flex-row items-baseline" href="/">
        <h1 className="relative flex flex-row items-baseline text-2xl font-bold">
          <span className="sr-only">BidDropper</span>
          <span className="tracking-tight hover:cursor-pointer">
            bid
            <span className="text-primary">dropper</span>
          </span>
        </h1>
      </a>
    </div>
  );
};

