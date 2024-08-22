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
		join: "/queue/:id/join",
		index: "/queue",
		leave: "/queue/:id/leave",
	},
};

export default RedirectConfig;
