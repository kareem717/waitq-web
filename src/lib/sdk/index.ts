/* tslint:disable */
/* eslint-disable */
export * from "./runtime";
export * from "./apis/index";
export * from "./models/index";

import { AccountsApi } from "./apis";
import { Configuration } from "./runtime";
import { env } from "../../env";
import supabase from "../utils/supabase/server";

const API = async () => {
	const sb = supabase();
	
	const session = await sb.auth.getSession();
	const apiClient = new Configuration({
		basePath: env.NEXT_PUBLIC_BACKEND_URL,
		accessToken: session.data.session?.access_token,
	});

	const accountsApi = new AccountsApi(apiClient);

	return {
		accountsApi,
	};
};

export default API;
