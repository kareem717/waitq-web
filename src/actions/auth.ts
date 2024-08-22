"use server";

import { actionClient } from "@/lib/safe-action";
import createClient from "@/lib/utils/supabase/server";
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
		return await apiClient.accountsApi.getAccountsByUserId({
			userId,
			includeDeleted: false,
		});
	});

export const getLoggedInAccount = actionClient.action(
	async ({ ctx: { apiClient } }) => {
		const supabase = createClient()
		const { data: { user } } = await supabase.auth.getUser()

		if (!user) {
			return null;
		}

		const accounts = await apiClient.accountsApi.getAccountsByUserId({
			userId: user.id,
			includeDeleted: false,
		});

		return accounts.accounts[0];
	}
);

export const getUser = actionClient.action(async ({ ctx: { user } }) => {
	return user;
});
