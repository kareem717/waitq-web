"use server";

import { actionClient } from "@/lib/safe-action";
import { z } from "zod";

export const createAccount = actionClient
	.schema(
		z.object({
			username: z.string().min(3).max(10),
			userId: z.string().uuid(),
		})
	)
	.action(async ({ parsedInput: { username, userId }, ctx: { apiClient } }) => {
		return await apiClient.accountsApi.createAccount({
			createAccountInputBody: {
				account: {
					userId,
					username,
				},
			},
		});
	});

export const updateAccount = actionClient
	.schema(
		z.object({
			id: z.string().uuid(),
			fields: z.object({
				username: z.string().min(3).max(10),
			}),
		})
	)
	.action(async ({ parsedInput: { id, fields }, ctx: { apiClient } }) => {
		return await apiClient.accountsApi.updateAccount({
			id,
			updateAccountInputBody: {
				account: fields,
			},
		});
	});

export const getAccountByUserId = actionClient
	.schema(z.object({ userId: z.string().uuid() }))
	.action(async ({ parsedInput: { userId }, ctx: { apiClient } }) => {
		return await apiClient.accountsApi.getAccountsByUserId({
			userId,
			includeDeleted: false,
		});
	});

export const getLoggedInAccount = actionClient.action(
	async ({ ctx: { apiClient, session } }) => {
		const userId = session?.user?.id;

		if (!userId) {
			return null;
		}

		return await apiClient.accountsApi.getAccountsByUserId({
			userId,
			includeDeleted: false,
		});
	}
);

export const getSession = actionClient.action(async ({ ctx: { session } }) => {
	return session;
});
