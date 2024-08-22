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
import { getLoggedInAccount } from "@/actions/auth"


export default async function HomePage() {
  const supabase = createClient();

  const { data: { session } } = await supabase.auth.getSession();

  const accountRes = await getLoggedInAccount();

  return (
    <>
      <div className="max-w-md break-words">
        {session?.access_token}
        <br />
        <hr />
        <br />  
        {JSON.stringify(accountRes?.data)}
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