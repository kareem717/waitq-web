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

export const updateSubscription = actionClient
	.schema(
		z.object({
			accountId: z.string().uuid(),
			priceId: z.string(),
		})
	)
	.action(
		async ({ parsedInput: { accountId, priceId }, ctx: { apiClient } }) => {
			return await apiClient.subscriptionsApi.updateAccountSubscription({
				accountId,
				priceId,
			});
		}
	);

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

export const cancelSubscription = actionClient
	.schema(
		z.object({
			accountId: z.string().uuid(),
		})
	)
	.action(async ({ parsedInput: { accountId }, ctx: { apiClient } }) => {
		return await apiClient.subscriptionsApi.cancelAccountSubscription({
			accountId,
		});
	});
