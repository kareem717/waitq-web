import { env } from "@/env";
import supabase from "@/lib/utils/supabase/server";
import { NextResponse } from "next/server";
import redirects from "@/config/redirects";

export async function GET(request: Request) {
	// The `/auth/callback` route is required for the server-side auth flow implemented
	// by the SSR package. It exchanges an auth code for the user's session.
	// https://supabase.com/docs/guides/auth/server-side/nextjs
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get("code");
	const error = requestUrl.searchParams.get("error");

	if (error) {
		const errMsg =
			requestUrl.searchParams.get("error_description") ||
			"An error occurred while authenticating";
		console.error(error, errMsg);
		return NextResponse.redirect(
			`${env.NEXT_PUBLIC_APP_URL}/auth/error?error=${errMsg}`
		);
	} else if (code) {
		await supabase().auth.exchangeCodeForSession(code);
	}

	// URL to redirect to after sign up process completes
	return NextResponse.redirect(
		`${env.NEXT_PUBLIC_APP_URL}${redirects.auth.afterLogin}`
	);
}
