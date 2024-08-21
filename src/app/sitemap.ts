import redirects from "@/config/redirects";
import { env } from "@/env";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = env.NEXT_PUBLIC_APP_URL

	return [
		{
			url: `${baseUrl}${redirects.home}`,
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
			url: `${baseUrl}${redirects.privacy}`,
			lastModified: new Date(),
		},
		{
			url: `${baseUrl}${redirects.terms}`,
			lastModified: new Date(),
		},
		{
			url: `${baseUrl}${redirects.auth.login}`,
			lastModified: new Date(),
		},
	];
}
