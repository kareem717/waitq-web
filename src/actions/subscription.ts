"use server";

import { actionClient } from "@/lib/safe-action";
import { z } from "zod";

export const getSubscriptionByAccountId = actionClient
	.schema(
		z.object({
			accountId: z.string().uuid(),
		})
	)
	.action(async ({ parsedInput: { accountId }, ctx: { apiClient } }) => {
		return await apiClient.subscriptionsApi.getAccountSubscription({
			accountId,
		});
	});

export const getSubscriptionCheckoutLink = actionClient
	.schema(
		z.object({
			priceId: z.string(),
			redirectUrl: z.string(),
		})
	)
	.action(
		async ({ parsedInput: { priceId, redirectUrl }, ctx: { apiClient } }) => {
			return await apiClient.subscriptionsApi.getStripeCheckoutLink({
				priceId,
				redirectUrl,
			});
		}
	);

export const getBillingPortalLink = actionClient
	.schema(
		z.object({
			accountId: z.string().uuid(),
			redirectUrl: z.string(),
		})
	)
	.action(
		async ({ parsedInput: { accountId, redirectUrl }, ctx: { apiClient } }) => {
			return await apiClient.subscriptionsApi.getStripeBillingPortalLink({
				accountId,
				redirectUrl,
			});
		}
	);
