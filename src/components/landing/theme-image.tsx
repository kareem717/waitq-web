"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { ComponentPropsWithoutRef, FC } from "react"

export interface ThemeImageProps extends Omit<ComponentPropsWithoutRef<typeof Image>, "src"> {
  src: {
    light: string;
    dark: string;
  }
};

export const ThemeImage: FC<ThemeImageProps> = ({ width, height, alt, src, ...props }) => {
  const { resolvedTheme } = useTheme();

  return (
    <Image
      width={width}
      height={height}
      {...props}
      alt={alt}
      src={
        resolvedTheme === "light"
          ? src.light
          : src.dark
      }
    />
  );
};