import { LandingNav } from "@/components/landing/nav"
import { LandingFooter } from "@/components/landing/footer"
import { FAQ } from "@/components/landing/faq"
import { Hero } from "@/components/landing/hero"
import { Benefits } from "@/components/landing/benefits"
import { Features } from "@/components/landing/features"
import { Services } from "@/components/landing/services"
import { Pricing } from "@/components/landing/pricing"
import Image from "next/image"
import createClient from "@/lib/utils/supabase/server"
import { getAccountByUserId } from "@/actions/auth"


export default async function HomePage() {
  const supabase = createClient();

  const { data: { session } } = await supabase.auth.getSession();
  const { data: { user } } = await supabase.auth.getUser();

  let accountRes;
  if (user?.id) {
    accountRes = await getAccountByUserId({ userId: user.id });
  }

  const res = {
    session,
    account: accountRes?.data,
    user,
  }
  return (
    <>
      <div className="max-w-md break-words">
        {JSON.stringify(res)}
      </div>
      <LandingNav />
      <Hero />
      <Benefits />
      <Features />
      <Services />
      <Pricing />
      <FAQ />
      <LandingFooter />
    </>
  );
}