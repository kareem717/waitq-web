import { Icons } from "@/components/icons";
import redirects from "./redirects";

export type Submenu = {
	href: string;
	label: string;
	pathIdentifier: string;
};

export type Menu = {
	href: string;
	label: string;
	pathIdentifier: string;
	icon: keyof typeof Icons;
	submenus: Submenu[];
};

export type Group = {
	groupLabel: string;
	menus: Menu[];
};

const NavigationConfig: Group[] = [
	{
		groupLabel: "",
		menus: [
			{
				href: redirects.app.dashboard,
				label: "Dashboard",
				pathIdentifier: redirects.app.dashboard,
				icon: "layoutGrid",
				submenus: [],
			},
		],
	},
	{
		groupLabel: "Settings",
		menus: [
			{
				href: redirects.app.settings.account,
				label: "Account",
				pathIdentifier: redirects.app.settings.account,
				icon: "users",
				submenus: [],
			},
		],
	},
];

export default NavigationConfig;
