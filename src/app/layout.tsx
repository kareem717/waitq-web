import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/providers/theme-provider";
import AuthProvider from "@/components/providers/auth-provider";
import { getLoggedInAccount, getUser } from "@/actions/auth";
import { getSubscriptionByAccountId } from "@/actions/subscription";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    default: "waitq",
    template: "%s - waitq",
  },
  description: "Create and manage waitlists for your products.",
  keywords: ["waitlist", "waitlists", "email", "email list", "waitq", "waitq.sh", "landing page", "launch"],
  twitter: {
    card: "summary_large_image",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const resp = await getUser();
  const user = resp?.data;

  let subscription

  const accountResp = await getLoggedInAccount();
  const account = accountResp?.data?.accounts[0];

  if (account) {
    const subscriptionResp = await getSubscriptionByAccountId({
      accountId: account.id,
    });

    if (subscriptionResp?.serverError || subscriptionResp?.validationErrors) {
      throw new Error(subscriptionResp?.serverError || "Something went wrong.");
    }

    subscription = subscriptionResp?.data?.subscriptionRelationship;
  }

  return (
    <html lang="en" className={GeistSans.className}>
      <body
        className="h-screen w-screen bg-background antialiased"
      >
        <AuthProvider user={user || undefined} account={account} subscription={subscription}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
