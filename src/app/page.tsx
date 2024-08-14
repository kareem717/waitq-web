import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { WaitlistForm } from "@/components/app/waitlist-form"
import Link from "next/link"
import redirects from "@/config/redirects"
import supabase from "@/lib/utils/supabase/server"

export default async function HomePage() {
  const { data } = await supabase().auth.getSession();

  return (
    <div className="flex flex-col items-center justify-center h-full w-full mt-10 sm:mt-20 px-2">
      <Card>
        <CardHeader>
          <CardTitle>Sign up for the waitlist</CardTitle>
          <CardDescription>We&#39;ll let you know when we launch</CardDescription>
        </CardHeader>
        <CardContent>
          <WaitlistForm />
          {JSON.stringify(data.session?.access_token)}
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground text-center">
          <p>
            By signing up, you agree to our <Link href={redirects.terms} className="underline">terms of service</Link> and <Link href={redirects.privacy} className="underline">privacy policy</Link>.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}