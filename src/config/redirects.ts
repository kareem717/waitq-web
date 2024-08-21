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
		waitlist: {
			create: "/waitlist/create",
			index: "/waitlist/:id",
			settings: "/waitlist/:id/settings",
			edit: "/waitlist/:id/edit",
			emails: "/waitlist/:id/emails",
		},
	},
	queue: {
		join: "/queue/:urlAlias/join",
		index: "/queue",
		leave: "/queue/:urlAlias/leave",
	},
};

export default RedirectConfig;
