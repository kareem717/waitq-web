"use client";

import { ComponentPropsWithoutRef, FC, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export interface CopyInputProps extends ComponentPropsWithoutRef<typeof Input> {
  hidden?: boolean;
  value: string;
}

export const CopyInput: FC<CopyInputProps> = ({ className, value, hidden = false, ...props }) => {
  const [copied, setCopied] = useState(false);
  const [isHidden, setIsHidden] = useState(hidden);

  const handleCopy = () => {
    if (value) {
      navigator.clipboard.writeText(value.toString()).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
      });
    }
  };

  const handleReveal = () => {
    setIsHidden(false);
  };

  return (
    <div className="relative w-full">
      <Input
        className={cn("disabled:cursor-text w-full", className)}
        {...props}
        disabled
        readOnly
        value={value}
        type={isHidden ? "password" : "text"}
      />
      <div className="absolute inset-y-0 right-0 pl-3 pr-1.5 flex space-x-1 items-center">
        <Button
          className="flex items-center justify-center gap-2 h-7 px-2"
          variant="outline"
          size="sm"
          onClick={isHidden ? handleReveal : handleCopy}
        >
          {isHidden ? (
            <span className="text-xs text-muted-foreground">Reveal</span>
          ) : (
            <>
              <Icons.copy className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{copied ? "Copied" : "Copy"}</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};