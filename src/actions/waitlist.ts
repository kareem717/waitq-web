"use server";

import {
	actionClient,
	anonWaitlistActionClient,
	machineClient,
	serviceWaitlistActionClient,
} from "@/lib/safe-action";
import { z } from "zod";

const paginationRequestSchema = z.object({
	page: z.number().optional(),
	pageSize: z.number().optional(),
	includeDeleted: z.boolean().optional().default(false),
});

export const getWaitlistByAccountId = actionClient
	.schema(
		z.object({
			accountId: z.string().uuid(),
			paginationParams: paginationRequestSchema,
		})
	)
	.action(
		async ({
			parsedInput: { accountId, paginationParams },
			ctx: { apiClient },
		}) => {
			return await apiClient.waitlistsApi.getWaitlistsByAccountId({
				accountId,
				getWaitlistByAccountIDInputBody: {
					paginationParams,
				},
			});
		}
	);

export const getWaitlistById = serviceWaitlistActionClient
	.schema(z.object({ waitlistId: z.string().uuid() }))
	.action(async ({ parsedInput: { waitlistId }, ctx: { apiClient } }) => {
		return await apiClient.waitlistsApi.getWaitlistById({
			id: waitlistId,
		});
	});

export const getWaitlistByUrlAlias = actionClient
	.schema(z.object({ urlAlias: z.string() }))
	.action(async ({ parsedInput: { urlAlias }, ctx: { apiClient } }) => {
		return await apiClient.waitlistsApi.getWaitlistByUrlAlias({
			urlAlias,
		});
	});

export const genNewJWT = serviceWaitlistActionClient
	.schema(
		z.object({
			waitlistId: z.string().uuid(),
			jwtSecret: z.string().optional(),
		})
	)
	.action(
		async ({ parsedInput: { waitlistId, jwtSecret }, ctx: { apiClient } }) => {
			return await apiClient.waitlistsApi.generateNewWaitlistJwtSecret({
				id: waitlistId,
				updateWaitlistJWTSecretInputBody: {
					waitlist: {
						jwtSecret,
					},
				},
			});
		}
	);

export const isUrlAliasAvailable = actionClient
	.schema(
		z.object({
			urlAlias: z.string(),
		})
	)
	.action(async ({ parsedInput: { urlAlias }, ctx: { apiClient } }) => {
		return await apiClient.waitlistsApi.checkUrlAliasAvailable({
			urlAlias,
		});
	});

export const createWaitlist = actionClient
	.schema(
		z.object({
			waitlist: z.object({
				name: z.string(),
				accountId: z.string().uuid(),
				urlAlias: z.string(),
			}),
		})
	)
	.action(async ({ parsedInput: { waitlist }, ctx: { apiClient } }) => {
		return await apiClient.waitlistsApi.createWaitlist({
			createWaitlistInputBody: {
				waitlist,
			},
		});
	});

export const updateWaitlist = serviceWaitlistActionClient
	.schema(
		z.object({
			waitlistId: z.string().uuid(),
			waitlist: z.object({
				name: z.string(),
				urlAlias: z.string(),
			}),
		})
	)
	.action(
		async ({ parsedInput: { waitlistId, waitlist }, ctx: { apiClient } }) => {
			return await apiClient.waitlistsApi.updateWaitlist({
				id: waitlistId,
				updateWaitlistInputBody: {
					waitlist,
				},
			});
		}
	);

export const joinWaitlist = anonWaitlistActionClient
	.schema(z.object({ waitlistId: z.string().uuid(), email: z.string() }))
	.action(
		async ({ parsedInput: { waitlistId, email }, ctx: { apiClient } }) => {
			return await apiClient.waitlistsApi.addEmailToWaitlist({
				id: waitlistId,
				addEmailsInputBody: {
					email: email,
				},
			});
		}
	);

export const leaveWaitlist = actionClient
	.schema(z.object({ waitlistId: z.string().uuid(), encodedEmail: z.string() }))
	.action(
		async ({
			parsedInput: { waitlistId, encodedEmail },
			ctx: { apiClient },
		}) => {
			return await apiClient.waitlistsApi.unsubscribeFromWaitlist({
				id: waitlistId,
				unsubscribeEmailInputBody: {
					encodedEmail,
				},
			});
		}
	);

export const getWaitlistAnalytics = serviceWaitlistActionClient
	.schema(z.object({ waitlistId: z.string().uuid() }))
	.action(async ({ parsedInput: { waitlistId }, ctx: { apiClient } }) => {
		return await apiClient.waitlistsApi.getWaitlistAnalytics({
			id: waitlistId,
		});
	});

export const exportEmailsToCSV = serviceWaitlistActionClient
	.schema(z.object({ waitlistId: z.string().uuid() }))
	.action(async ({ parsedInput: { waitlistId }, ctx: { apiClient } }) => {
		return await apiClient.waitlistsApi.exportWaitlistEmailsToCsv({
			id: waitlistId,
		});
	});

export const deleteWaitlist = serviceWaitlistActionClient
	.schema(z.object({ waitlistId: z.string().uuid() }))
	.action(async ({ parsedInput: { waitlistId }, ctx: { apiClient } }) => {
		return await apiClient.waitlistsApi.deleteWaitlist({
			id: waitlistId,
		});
	});

export const getWaitlistSitemapData = machineClient
	.schema(z.object({ cursor: z.string().uuid().optional() }))
	.action(async ({ parsedInput: { cursor }, ctx: { apiClient } }) => {
		return await apiClient.waitlistsApi.getPublicWaitlistMainPage({
			getPublicManyWaitlistsInputBody: {
				cursor,
				includeDeleted: false,
				pageSize: 25000,
			},
		});
	});
