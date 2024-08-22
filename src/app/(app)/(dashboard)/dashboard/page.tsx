import { getLoggedInAccount } from "@/actions/auth"
import { getWaitlistByAccountId } from "@/actions/waitlist"
import { WaitlistIndexCard } from "@/components/app/waitlist/index-card"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import redirects from "@/config/redirects"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default async function DashboardPage({ searchParams }: { searchParams: { page: string | null, limit: string | null } }) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 10

  const accountResponse = await getLoggedInAccount()
  const account = accountResponse?.data

  if (!account) {
    throw new Error("No account found")
  }

  const waitlistResp = await getWaitlistByAccountId({
    accountId: account.id,
    paginationParams: {
      page,
      pageSize: limit + 1,
    },
  })

  const data = waitlistResp?.data

  if (waitlistResp?.serverError || waitlistResp?.validationErrors) {
    throw new Error(waitlistResp?.serverError || "Something went wrong")
  }

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Waitlists</h1>
        <Link className={cn(buttonVariants({ variant: "secondary" }), "flex items-center gap-2")} href={redirects.app.waitlist.create}>
          <Icons.add className="size-5" />
          <span className="hidden md:inline">
            Create Waitlist
          </span>
        </Link>
      </div>
      <div className="flex flex-col gap-4 items-center justify-between w-full h-full">
        {!!data?.waitlists.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {data?.waitlists.map((waitlist) => (
              <WaitlistIndexCard key={waitlist.id} waitlistId={waitlist.id} name={waitlist.name} createdAt={waitlist.createdAt} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">No waitlists found</p>
          </div>
        )}
        <Pagination className="mb-4">
          <PaginationContent>
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious href={`${redirects.app.dashboard}?page=${page - 1}&limit=${limit}`} />
              </PaginationItem>
            )}
            {(data?.count ?? 0) > limit && (
              <PaginationItem>
                <PaginationNext href={`${redirects.app.dashboard}?page=${page + 1}&limit=${limit}`} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div >
    </div >

  )
}