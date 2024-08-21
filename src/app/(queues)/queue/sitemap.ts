import { getWaitlistSitemapData } from "@/actions/waitlist";
import { env } from "@/env";
import { MetadataRoute } from "next";
import RedirectConfig from "@/config/redirects";

export async function generateSitemaps() {
	const data: {
		id: string;
	}[] = [];

	const resp = await getWaitlistSitemapData({});
	if (!resp?.data) {
		throw new Error("No data returned from getWaitlistSitemapData");
	}

	data.push({
		id: "1",
	});

	const intialData = resp.data;
	if (intialData.nextCursor) {
		data.push({
			id: intialData.nextCursor,
		});
	}

	if (intialData.hasNext) {
		let cursor = intialData.nextCursor;
		let hasNext = !!intialData.hasNext;

		while (hasNext) {
			const waitlists = await getWaitlistSitemapData({ cursor });
			if (!waitlists?.data) {
				throw new Error("No data returned from getWaitlistSitemapData");
			}

			if (waitlists.data.nextCursor) {
				data.push({
					id: waitlists.data.nextCursor,
				});
			}

			cursor = waitlists.data.nextCursor;
			hasNext = waitlists.data.hasNext;
		}
	}

	return data;
}

const BASE_URL = env.NEXT_PUBLIC_APP_URL;

export default async function sitemap({
	id,
}: {
	id: string;
}): Promise<MetadataRoute.Sitemap> {
	const waitlists = await getWaitlistSitemapData({
		cursor: id == "1" ? undefined : id,
	});
	if (!waitlists?.data) {
		throw new Error("No data returned from getWaitlistSitemapData");
	}

	const links = waitlists.data.waitlists.map((waitlist) => [
		{
			url: `${BASE_URL}${RedirectConfig.queue.join.replace(
				":id",
				waitlist.id
			)}`,
			lastModified: waitlist.updatedAt ?? waitlist.createdAt,
		},
		{
			url: `${BASE_URL}${RedirectConfig.queue.leave.replace(
				":id",
				waitlist.id
			)}`,
			lastModified: waitlist.updatedAt ?? waitlist.createdAt,
		},
	]);

	return links.flat();
}
