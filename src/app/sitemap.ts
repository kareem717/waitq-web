import redirects from "@/config/redirects";
import { env } from "@/env";
import { MetadataRoute } from "next";

const BASE_URL = env.NEXT_PUBLIC_APP_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	return [
		{
			url: `${BASE_URL}${redirects.home}`,
			lastModified: new Date(),
			// lastModified?: string | Date
			// changeFrequency?:
			//   | 'always'
			//   | 'hourly'
			//   | 'daily'
			//   | 'weekly'
			//   | 'monthly'
			//   | 'yearly'
			//   | 'never'
			// priority?: number
			// alternates?: {
			//   languages?: Languages<string>
			// }
		},
		{
			url: `${BASE_URL}${redirects.privacy}`,
			lastModified: new Date(),
		},
		{
			url: `${BASE_URL}${redirects.terms}`,
			lastModified: new Date(),
		},
		{
			url: `${BASE_URL}${redirects.auth.login}`,
			lastModified: new Date(),
		},
	];
}
