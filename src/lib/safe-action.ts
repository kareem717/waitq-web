import {
	createSafeActionClient,
	DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";

class ActionError extends Error {
	constructor(message: string, public statusCode: number) {
		super(message);
	}
}

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
});
