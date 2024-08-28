import type { MetadataRoute } from "next";
import { env } from "@/env";
import redirects from "@/config/redirects";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: ["/"],
				disallow: [
					`${redirects.app.settings.account}/*`,
					`${redirects.app.settings.billing}/*`,
					`${redirects.app.waitlist}/*`,
					`${redirects.auth.callback}`,
					`${redirects.auth.logout}`,
					`${redirects.auth.createAccount}`,
					`${redirects.queue.index}`,
				],
			},
		],
		sitemap: `${env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
		// {
		//   rules:
		//     | {
		//         userAgent?: string | string[]
		//         allow?: string | string[]
		//         disallow?: string | string[]
		//         crawlDelay?: number
		//       }
		//     | Array<{
		//         userAgent: string | string[]
		//         allow?: string | string[]
		//         disallow?: string | string[]
		//         crawlDelay?: number
		//       }>
		//   sitemap?: string | string[]
		//   host?: string
		// }
	};
}
