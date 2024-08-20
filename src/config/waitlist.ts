import { Icons } from "@/components/icons";
import redirects from "./redirects";

export type Menu = {
	href: string;
	label: string;
	pathIdentifier: string;
	icon: keyof typeof Icons;
};

const nav: Menu[] = [
	{
		href: redirects.app.waitlist.edit,
		label: "Edit",
		pathIdentifier: redirects.app.waitlist.edit,
		icon: "edit",
	},
	{
		href: redirects.app.waitlist.emails,
		label: "Emails",
		pathIdentifier: redirects.app.waitlist.emails,
		icon: "mail",
	},
	{
		href: redirects.app.waitlist.settings,
		label: "Settings",
		pathIdentifier: redirects.app.waitlist.settings,
		icon: "settings",
	},
];

const WaitlistConfig = {
	nav,
};

export default WaitlistConfig;
