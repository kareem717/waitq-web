"use server";

import API from "@/lib/sdk";
import { actionClient } from "@/lib/safe-action";
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
	.action(async ({ parsedInput: { accountId, paginationParams } }) => {
		const { waitlistsApi } = await API();

		return await waitlistsApi.getWaitlistsByAccountId({
			accountId,
			getWaitlistByAccountIDInputBody: {
				paginationParams,
			},
		});
	});

export const getWaitlistById = actionClient
	.schema(z.object({ id: z.string().uuid() }))
	.action(async ({ parsedInput: { id } }) => {
		const { waitlistsApi } = await API();

		return await waitlistsApi.getWaitlistById({
			id,
		});
	});

export const genNewJWT = actionClient
	.schema(z.object({ id: z.string().uuid(), jwtSecret: z.string().optional() }))
	.action(async ({ parsedInput: { id, jwtSecret } }) => {
		const { waitlistsApi } = await API();

		return await waitlistsApi.generateNewWaitlistJwtSecret({
			id,
			updateWaitlistJWTSecretInputBody: {
				waitlist: {
					jwtSecret,
				},
			},
		});
	});

export const createWaitlist = actionClient
	.schema(
		z.object({
			waitlist: z.object({
				name: z.string(),
				accountId: z.string().uuid(),
			}),
		})
	)
	.action(async ({ parsedInput: { waitlist } }) => {
		const { waitlistsApi } = await API();

		return await waitlistsApi.createWaitlist({
			createWaitlistInputBody: {
				waitlist,
			},
		});
	});

export const updateWaitlist = actionClient
	.schema(
		z.object({
			id: z.string().uuid(),
			waitlist: z.object({
				name: z.string(),
			}),
		})
	)
	.action(async ({ parsedInput: { id, waitlist } }) => {
		const { waitlistsApi } = await API();

		return await waitlistsApi.updateWaitlist({
			id,
			updateWaitlistInputBody: {
				waitlist,
			},
		});
	});

export const joinWaitlist = actionClient
	.schema(z.object({ id: z.string().uuid(), email: z.string() }))
	.action(async ({ parsedInput: { id, email } }) => {
		const { waitlistsApi } = await API();

		return await waitlistsApi.addEmailsToWaitlist({
			id,
			addEmailsInputBody: {
				emails: [email],
			},
		});
	});

export const leaveWaitlist = actionClient
	.schema(z.object({ id: z.string().uuid(), encodedEmail: z.string() }))
	.action(async ({ parsedInput: { id, encodedEmail } }) => {
		const { waitlistsApi } = await API();

		return await waitlistsApi.unsubscribeFromWaitlist({
			id,
			unsubscribeEmailInputBody: {
				encodedEmail,
			},
		});
	});

export const getWaitlistAnalytics = actionClient
	.schema(z.object({ id: z.string().uuid() }))
	.action(async ({ parsedInput: { id } }) => {
		const { waitlistsApi } = await API();

		return await waitlistsApi.getWaitlistAnalytics({
			id,
		});
	});

export const exportEmailsToCSV = actionClient
	.schema(z.object({ id: z.string().uuid() }))
	.action(async ({ parsedInput: { id } }) => {
		const { waitlistsApi } = await API();

		return await waitlistsApi.exportWaitlistEmailsToCsv({
			id,
		});
	});

export const deleteWaitlist = actionClient
	.schema(z.object({ id: z.string().uuid() }))
	.action(async ({ parsedInput: { id } }) => {
		const { waitlistsApi } = await API();

		return await waitlistsApi.deleteWaitlist({
			id,
		});
	});
