const RedirectConfig = {
	home: "/",
	privacy: "/privacy-policy",
	terms: "/terms-of-service",
	auth: {
		login: "/login",
		logout: "/logout",
		afterLogin: "/dashboard",
		afterLogout: "/login",
		callback: "/auth/callback",
		createAccount: "/create-account",
	},
	app: {
		dashboard: "/dashboard",
		settings: {
			account: "/settings/account",
			billing: "/settings/billing",
		},
	},
};

export default RedirectConfig;
