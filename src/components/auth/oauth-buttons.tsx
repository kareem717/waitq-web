"use client";

import { Icons } from "../icons";
import { Button } from "../ui/button";
import supabase from "@/lib/utils/supabase/client";
import { useRouter } from "next/navigation";
import { env } from "@/env";
import { ComponentPropsWithoutRef, FC, useState } from "react";
import redirects from "@/config/redirects";
export type OAuthProvider = "google" | "github";

export interface OAuthButtonProps extends ComponentPropsWithoutRef<typeof Button> {
  provider: OAuthProvider;
  icon: keyof typeof Icons;
  isLoading: string | null;
  handleLogin: (provider: OAuthProvider) => void;
}

export const OAuthButton: FC<OAuthButtonProps> = ({ icon, provider, isLoading, handleLogin, ...props }) => {
  const Icon = Icons[icon];

  return (
    <Button className="w-full" variant="secondary" onClick={() => handleLogin(provider)} disabled={!!isLoading} {...props}>
      {
        isLoading === provider ? <Icons.spinner className="w-4 h-4 animate-spin" /> : <Icon className="w-4 h-4" />
      }
    </Button>
  )
};

export const OAuthButtons: FC<{ providers: { provider: OAuthProvider, icon: keyof typeof Icons }[], disabled?: boolean }> = ({ providers, disabled }) => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (provider: OAuthProvider) => {
    setIsLoading(provider);
    const sb = supabase();
    
    const { data, error } = await sb.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${env.NEXT_PUBLIC_APP_URL}${redirects.auth.callback}`
      }
    });

    if (error) {
      throw error
    } else {
      router.push(data.url)
    }
    setIsLoading(null);
  };

  return (

    <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
      {providers.map(({ provider, icon }) => (
        <OAuthButton key={provider} provider={provider} icon={icon} isLoading={isLoading} handleLogin={handleLogin} disabled={disabled} />
      ))}
    </div>
  );
};
