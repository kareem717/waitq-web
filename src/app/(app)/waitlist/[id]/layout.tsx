import { WaitlistSideBar } from "@/components/app/waitlist/layout/side-bar"
import { WaitlistNav } from "@/components/app/waitlist/layout/nav"
import { Metadata } from "next";
import { getLoggedInAccount } from "@/actions/auth";
import { getWaitlistByAccountId } from "@/actions/waitlist";

// export const generateStaticParams = async () => {
//   const accountResp = await getLoggedInAccount()
//   if (!accountResp?.data?.accounts[0]) {
//     return []
//   }

//   const waitslists = await getWaitlistByAccountId({
//     accountId: accountResp.data.accounts[0].id,
//     paginationParams: {
//       page: 1,
//       pageSize: 10,
//       includeDeleted: false
//     }
//   })


//   return waitslists?.data?.waitlists.map((waitlist) => ({
//     id: waitlist.id
//   }))
// };

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
        <div className="flex-1 overflow-auto px-4 py-10 md:px-8 md:py-8">
          {children}
        </div>
      </div>
    </div>
  );
}
