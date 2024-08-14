"use client";

import { Button } from "../ui/button";
import supabase from "@/lib/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner"
import { useState } from "react";
import { Icons } from "../icons";

export const LogoutButtons = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);

    const sb = supabase();
    const { error } = await sb.auth.signOut();

    if (error) {
      toast.error("Uh oh! Something went wrong. Please try again.")
      return setIsLoading(false);
    }

    router.refresh();
  };

  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
      <Button className="w-full" variant="secondary" onClick={handleLogout} disabled={isLoading}>
        {
          isLoading ? <Icons.spinner className="w-4 h-4 animate-spin" /> : "Logout"
        }
      </Button>
      <Button className="w-full" variant="default" onClick={() => router.back()} disabled={isLoading}>Go back</Button>
    </div>
  );
};
