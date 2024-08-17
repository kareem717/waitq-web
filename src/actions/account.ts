"use server";

import API from "@/lib/sdk";
import { actionClient } from "@/lib/safe-action";
import { z } from "zod";

export const createAccount = actionClient
	.schema(
		z.object({
			username: z.string().min(3).max(10),
			userId: z.string().uuid(),
		})
	)
	.action(async ({ parsedInput: { username, userId } }) => {
		const { accountsApi } = await API();

		return await accountsApi.createAccount({
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
	.action(async ({ parsedInput: { id, fields } }) => {
		const { accountsApi } = await API();

		// Backend already validates that the user is the owner of the account
		return await accountsApi.updateAccount({
			id,
			updateAccountInputBody: {
				account: fields,
			},
		});
	});

export const getAccountByUserId = actionClient
	.schema(z.object({ userId: z.string().uuid() }))
	.action(async ({ parsedInput: { userId } }) => {
		const { accountsApi } = await API();

		return await accountsApi.getAccountsByUserId({
			userId,
			includeDeleted: false,
		});
	});
