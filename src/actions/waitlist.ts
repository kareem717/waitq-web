"use server";

import API, {
	CreateWaitlistFieldsStruct,
	PaginationRequest,
	UpdateWaitlistFieldsStruct,
} from "@/lib/sdk";
import { ResponseError } from "@/lib/sdk/runtime";

export async function getWaitlistByAccountId(
	accountId: string,
	paginationParams: PaginationRequest
) {
	try {
		const { waitlistsApi } = await API();

		const response = await waitlistsApi.getWaitlistsByAccountId({
			accountId,
			getWaitlistByAccountIDInputBody: {
				paginationParams,
			},
		});

		return response;
	} catch (error) {
		if (error instanceof ResponseError) {
			const errorDetails = await error.response.json();

			throw new Error(
				errorDetails.detail || "An error occurred while fetching the waitlist"
			);
		}
		throw error;
	}
}

export async function getWaitlistById(id: string) {
	try {
		const { waitlistsApi } = await API();

		const response = await waitlistsApi.getWaitlistById({
			id,
		});

		return response;
	} catch (error) {
		if (error instanceof ResponseError) {
			const errorDetails = await error.response.json();

			throw new Error(
				errorDetails.detail || "An error occurred while fetching the waitlist"
			);
		}
		throw error;
	}
}

export async function genNewJWT(id: string, jwtSecret?: string) {
	try {
		const { waitlistsApi } = await API();

		const response = await waitlistsApi.generateNewWaitlistJwtSecret({
			id,
			updateWaitlistJWTSecretInputBody: {
				waitlist: {
					jwtSecret,
				},
			},
		});

		return response;
	} catch (error) {
		if (error instanceof ResponseError) {
			const errorDetails = await error.response.json();

			throw new Error(
				errorDetails.detail || "An error occurred while fetching the waitlist"
			);
		}
		throw error;
	}
}

export async function createWaitlist(waitlist: CreateWaitlistFieldsStruct) {
	try {
		const { waitlistsApi } = await API();

		const response = await waitlistsApi.createWaitlist({
			createWaitlistInputBody: {
				waitlist,
			},
		});

		return response;
	} catch (error) {
		if (error instanceof ResponseError) {
			const errorDetails = await error.response.json();

			throw new Error(
				errorDetails.detail || "An error occurred while fetching the waitlist"
			);
		}
		throw error;
	}
}

export async function updateWaitlist(
	id: string,
	waitlist: UpdateWaitlistFieldsStruct
) {
	try {
		const { waitlistsApi } = await API();

		const response = await waitlistsApi.updateWaitlist({
			id,
			updateWaitlistInputBody: {
				waitlist,
			},
		});

		return response;
	} catch (error) {
		if (error instanceof ResponseError) {
			const errorDetails = await error.response.json();

			throw new Error(
				errorDetails.detail || "An error occurred while fetching the waitlist"
			);
		}
		throw error;
	}
}

export async function joinWaitlist(id: string, email: string) {
	try {
		const { waitlistsApi } = await API();

		const response = await waitlistsApi.addEmailsToWaitlist({
			id,
			addEmailsInputBody: {
				emails: [email],
			},
		});

		return response;
	} catch (error) {
		if (error instanceof ResponseError) {
			const errorDetails = await error.response.json();

			throw new Error(
				errorDetails.detail || "An error occurred while fetching the waitlist"
			);
		}
		throw error;
	}
}

export async function leaveWaitlist(id: string, encodedEmail: string) {
	try {
		const { waitlistsApi } = await API();

		const response = await waitlistsApi.unsubscribeFromWaitlist({
			id,
			unsubscribeEmailInputBody: {
				encodedEmail,
			},
		});
		return response;
	} catch (error) {
		if (error instanceof ResponseError) {
			const errorDetails = await error.response.json();

			throw new Error(
				errorDetails.detail || "An error occurred while fetching the waitlist"
			);
		}
		throw error;
	}
}

export async function getWaitlistAnalytics(id: string) {
	try {
		const { waitlistsApi } = await API();

		const response = await waitlistsApi.getWaitlistAnalytics({
			id,
		});

		return response;
	} catch (error) {
		if (error instanceof ResponseError) {
			const errorDetails = await error.response.json();

			throw new Error(
				errorDetails.detail || "An error occurred while fetching the waitlist"
			);
		}
		throw error;
	}
}

export async function exportEmailsToCSV(id: string) {
	try {
		const { waitlistsApi } = await API();

		const response = await waitlistsApi.exportWaitlistEmailsToCsv({
			id,
		});

		return response;
	} catch (error) {
		if (error instanceof ResponseError) {
			const errorDetails = await error.response.json();

			throw new Error(
				errorDetails.detail || "An error occurred while fetching the waitlist"
			);
		}
		throw error;
	}
}
