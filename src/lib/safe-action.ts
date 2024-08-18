import {
	createSafeActionClient,
	DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";

import { AccountsApi, WaitlistsApi } from "@/lib/sdk/apis";
import { Configuration } from "@/lib/sdk/runtime";
import { env } from "@/env";
import supabase from "@/lib/utils/supabase/server";

class ActionError extends Error {
	constructor(message: string, public statusCode: number) {
		super(message);
	}
}

const apiClient = (accessToken?: string) => {
	const apiClient = new Configuration({
		basePath: env.NEXT_PUBLIC_BACKEND_URL,
		accessToken,
	});

	const accountsApi = new AccountsApi(apiClient);
	const waitlistsApi = new WaitlistsApi(apiClient);

	return {
		accountsApi,
		waitlistsApi,
	};
};

export const actionClient = createSafeActionClient({
	handleReturnedServerError: (error) => {
		if (error instanceof ActionError) {
			return error.message;
		}

		return DEFAULT_SERVER_ERROR_MESSAGE;
	},
	handleServerErrorLog: (error) => {
		console.error(error.message);
	},
}).use(async ({ next, clientInput, metadata }) => {
	const sb = supabase();

	const session = await sb.auth.getSession();

	return next({
		ctx: {
			apiClient: apiClient(session.data.session?.access_token),
		},
	});
});

export const anonWaitlistActionClient = actionClient.use(
	async ({ next, clientInput, metadata, ctx }) => {
		// Ensure clientInput is an object
		if (typeof clientInput !== "object" || clientInput === null) {
			throw new ActionError("Invalid client input", 400);
		}

		// check if waitlistId was provided
		if (!("waitlistId" in clientInput)) {
			throw new ActionError("Waitlist ID is required", 400);
		}

		try {
			const response = await ctx.apiClient.waitlistsApi.getWaitlistApiKeyById({
				id: clientInput.waitlistId as string,
			});

			return next({
				ctx: {
					apiClient: apiClient(response.waitlist.anonKey),
				},
			});
		} catch (error) {
			throw new ActionError(
				"An error occurred while fetching the waitlist API key",
				500
			);
		}
	}
);

export const serviceWaitlistActionClient = actionClient.use(
	async ({ next, clientInput, metadata, ctx }) => {
		// Ensure clientInput is an object
		if (typeof clientInput !== "object" || clientInput === null) {
			throw new ActionError("Invalid client input", 400);
		}

		// check if waitlistId was provided
		if (!("waitlistId" in clientInput)) {
			throw new ActionError("Waitlist ID is required", 400);
		}

		try {
			const response = await ctx.apiClient.waitlistsApi.getWaitlistApiKeyById({
				id: clientInput.waitlistId as string,
			});

			return next({
				ctx: { apiClient: apiClient(response.waitlist.serviceKey) },
			});
		} catch (error) {
			throw new ActionError(
				"An error occurred while fetching the waitlist API key",
				500
			);
		}
	}
);
