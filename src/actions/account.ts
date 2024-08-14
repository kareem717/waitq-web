"use server";

import API, { UpdateAccountFieldsStruct } from "@/lib/sdk";
import { ResponseError } from "@/lib/sdk/runtime";

export async function createAccount(username: string, userId: string) {
	try {
		const { accountsApi } = await API();

		const response = await accountsApi.createAccount({
			createInputBody: {
				account: {
					userId,
					username,
				},
			},
		});
		return response;
	} catch (error) {
		if (error instanceof ResponseError) {
			const errorDetails = await error.response.json();

			throw new Error(
				errorDetails.detail || "An error occurred while creating the account"
			);
		}
		throw error;
	}
}

export async function updateAccount(
	id: string,
	fields: UpdateAccountFieldsStruct
) {
	try {
		const { accountsApi } = await API();

		// Backend already validates that the user is the owner of the account
		const response = await accountsApi.updateAccount({
			id,
			updateInputBody: {
				account: fields,
			},
		});
		return response;
	} catch (error) {
		if (error instanceof ResponseError) {
			const errorDetails = await error.response.json();

			throw new Error(
				errorDetails.detail || "An error occurred while creating the account"
			);
		}
		throw error;
	}
}

export async function getAccount(userId: string) {
	try {
		const { accountsApi } = await API();

		const response = await accountsApi.getAccountsByUserId({
			userId,
			includeDeleted: false,
		});

		return response;
	} catch (error) {
		if (error instanceof ResponseError) {
			const errorDetails = await error.response.json();

			throw new Error(
				errorDetails.detail || "An error occurred while fetching the account"
			);
		}
		throw error;
	}
}
