import { getUser } from "@/actions/auth";
import { LogoutForm } from "@/components/auth/logout-form";
import redirects from "@/config/redirects";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
export default async function LogoutPage() {
  //TODO: Fix this
cookies().getAll();

  const userResp = await getUser();
  if (userResp?.data) {
    redirect(redirects.auth.login);
  }

  return (
    <div className="mx-auto w-full max-w-[350px]">
      <LogoutForm />
    </div>
  );
}
