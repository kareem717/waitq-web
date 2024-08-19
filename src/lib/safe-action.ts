import {
	createSafeActionClient,
	DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";

import { AccountsApi, WaitlistsApi, SubscriptionsApi } from "@/lib/sdk/apis";
import { Configuration, ResponseError } from "@/lib/sdk/runtime";
import { env } from "@/env";
import supabase from "@/lib/utils/supabase/server";
import { ErrorModel } from "./sdk";

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
	const subscriptionsApi = new SubscriptionsApi(apiClient);

	return {
		accountsApi,
		waitlistsApi,
		subscriptionsApi,
	};
};

export const actionClient = createSafeActionClient({
	handleReturnedServerError: async (error) => {
		if (error instanceof ResponseError) {
			console.error(error.cause);
			try {
				const resp = (await error.response.json()) as ErrorModel;

				return resp.detail;
			} catch (e) {
				console.error(e);
				return DEFAULT_SERVER_ERROR_MESSAGE;
			}
		}

		return DEFAULT_SERVER_ERROR_MESSAGE;
	},
	handleServerErrorLog: (error) => {
		console.error(error.message);
	},
}).use(async ({ next, clientInput, metadata }) => {
	const sb = supabase();

	const {
		data: { session },
	} = await sb.auth.getSession();

	const {
		data: { user },
	} = await sb.auth.getUser();

	return next({
		ctx: {
			apiClient: apiClient(session?.access_token),
			user: user,
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

		const response = await ctx.apiClient.waitlistsApi.getWaitlistApiKeyById({
			id: clientInput.waitlistId as string,
		});

		return next({
			ctx: {
				apiClient: apiClient(response.waitlist.anonKey),
			},
		});
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

		const response = await ctx.apiClient.waitlistsApi.getWaitlistApiKeyById({
			id: clientInput.waitlistId as string,
		});

		return next({
			ctx: { apiClient: apiClient(response.waitlist.serviceKey) },
		});
	}
);
