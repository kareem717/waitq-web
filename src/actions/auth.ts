"use server";

import { actionClient } from "@/lib/safe-action";
import { z } from "zod";

export const createAccount = actionClient
	.schema(
		z.object({
			name: z.string().min(3).max(10),
			email: z.string().email(),
			userId: z.string().uuid(),
		})
	)
	.action(async ({ parsedInput: account, ctx: { apiClient } }) => {
		return await apiClient.accountsApi.createAccount({
			createAccountInputBody: {
				account,
			},
		});
	});

export const updateAccount = actionClient
	.schema(
		z.object({
			id: z.string().uuid(),
			fields: z.object({
				email: z.string().email(),
				name: z.string().min(3).max(10),
			}),
		})
	)
	.action(
		async ({ parsedInput: { id, fields: account }, ctx: { apiClient } }) => {
			return await apiClient.accountsApi.updateAccount({
				id,
				updateAccountInputBody: {
					account,
				},
			});
		}
	);

export const getAccountByUserId = actionClient
	.schema(z.object({ userId: z.string().uuid() }))
	.action(async ({ parsedInput: { userId }, ctx: { apiClient } }) => {
		const response = await apiClient.accountsApi.getAccountsByUserId({
			userId,
			includeDeleted: false,
		});

		return response.accounts[0]
	});