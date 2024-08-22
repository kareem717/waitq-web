import { WaitlistSideBar } from "@/components/app/waitlist/layout/side-bar"
import { WaitlistNav } from "@/components/app/waitlist/layout/nav"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "My Waitlist",
    template: "%s - My Waitlist",
  },
};

export default async function WaitlistLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { id: string }
}) {
  return (
    <div className="grid h-screen w-full md:pl-[56px] overflow-hidden">
      <WaitlistSideBar waitlistId={params.id} className="hidden md:block" />
      <div className="flex flex-col flex-1 overflow-hidden">
        <WaitlistNav waitlistId={params.id} />
        <div className="flex-1 overflow-auto px-4 py-10 md:px-8 md:py-8 w-full">
          <div className="max-w-screen-lg mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
