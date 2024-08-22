import { Icons } from "@/components/icons";

export type Social = {
	icon: keyof typeof Icons;
	href: string;
	label: string;
};

const socials: Social[] = [
	{
		label: "GitHub",
		icon: "github",
		href: "https://github.com/your_github_handle",
	},
];

export type FooterItem = {
	label: string;
	href: string;
};

export type FooterGroup = {
	label: string;
	items: FooterItem[];
};

const footerGroups: FooterGroup[] = [
	{
		label: "Contact",
		items: [
			{
				label: "Github",
				href: "#",
			},
			{
				label: "Twitter",
				href: "#",
			},
			{
				label: "Instagram",
				href: "#",
			},
		],
	},
	{
		label: "Platform",
		items: [
			{
				label: "iOS",
				href: "#",
			},
			{
				label: "Android",
				href: "#",
			},
			{
				label: "Web",
				href: "#",
			},
		],
	},
	{
		label: "Help",
		items: [
			{
				label: "Contact Us",
				href: "#",
			},
			{
				label: "FAQ",
				href: "#",
			},
			{
				label: "Feedback",
				href: "#",
			},
		],
	},
	{
		label: "Socials",
		items: [
			{
				label: "Twitter",
				href: "#",
			},
			{
				label: "Instagram",
				href: "#",
			},
			{
				label: "Discord",
				href: "#",
			},
		],
	},
];

export type FAQ = {
	question: string;
	answer: string;
	value: string;
};

const faq: FAQ[] = [
	{
		question: "Is this template free?",
		answer: "Yes. It is a free NextJS Shadcn template.",
		value: "item-1",
	},
	{
		question: "Duis aute irure dolor in reprehenderit in voluptate velit?",
		answer:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint labore quidem quam consectetur sapiente, iste rerum reiciendis animi nihil nostrum sit quo, modi quod.",
		value: "item-2",
	},
	{
		question:
			"Lorem ipsum dolor sit amet Consectetur natus dolor minus quibusdam?",
		answer:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore qui nostrum reiciendis veritatis.",
		value: "item-3",
	},
	{
		question: "Excepteur sint occaecat cupidata non proident sunt?",
		answer: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
		value: "item-4",
	},
	{
		question:
			"Enim ad minim veniam, quis nostrud exercitation ullamco laboris?",
		answer: "consectetur adipisicing elit. Sint labore.",
		value: "item-5",
	},
];

export type Benefit = {
	icon: keyof typeof Icons;
	title: string;
	description: string;
};

const benefits: Benefit[] = [
	{
		icon: "blocks",
		title: "Build Brand Trust",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio velit cum aliquam. Natus consectetur dolores.",
	},
	{
		icon: "chart",
		title: "More Leads",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio velit cum aliquam, natus consectetur.",
	},
	{
		icon: "wallet",
		title: "Higher Conversions",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus consectetur. A odio velit cum aliquam",
	},
	{
		icon: "sparkle",
		title: "Test Marketing Ideas",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio velit cum aliquam. Natus consectetur dolores.",
	},
];

export type Features = {
	icon: keyof typeof Icons;
	title: string;
	description: string;
};

export enum ProService {
	YES = 1,
	NO = 0,
}

export type Service = {
	title: string;
	pro: ProService;
	description: string;
};

const serviceList: Service[] = [
	{
		title: "Custom Domain Integration",
		description:
			"Lorem ipsum dolor sit, amet consectetur adipisicing elit adipisicing.",
		pro: 0,
	},
	{
		title: "Social Media Integrations",
		description:
			"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae, dicta.",
		pro: 0,
	},
	{
		title: "Email Marketing Integrations",
		description: "Lorem dolor sit amet adipisicing.",
		pro: 0,
	},
	{
		title: "SEO Optimization",
		description: "Lorem ipsum dolor sit amet consectetur.",
		pro: 1,
	},
];

const features: Features[] = [
	{
		icon: "tabletSmartphone",
		title: "Mobile Friendly",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio velit cum aliquam, consectetur.",
	},
	{
		icon: "badgeCheck",
		title: "Social Proof",
		description:
			"Lorem ipsum dolor sit amet consectetur. Natus consectetur, odio ea accusamus aperiam.",
	},
	{
		icon: "goal",
		title: "Targeted Content",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. odio ea accusamus aperiam.",
	},
	{
		icon: "pictureInPicture",
		title: "Strong Visuals",
		description:
			"Lorem elit. A odio velit cum aliquam. Natus consectetur dolores, odio ea accusamus aperiam.",
	},
	{
		icon: "mousePointerClick",
		title: "Clear CTA",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing. odio ea accusamus consectetur.",
	},
	{
		icon: "newspaper",
		title: "Clear Headline",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio velit cum aliquam. Natus consectetur.",
	},
];

const landingConfig = {
	nav: [
		{
			label: "Features",
			href: "#features",
		},
		{
			label: "Pricing",
			href: "#pricing",
		},
		{
			label: "FAQ",
			href: "#faq",
		},
		{
			label: "Newsletter",
			href: "#newsletter",
		},
	],
	socials,
	footer: {
		groups: footerGroups,
		privacy: "#",
		terms: "#",
	},
	hero: {
		update: "Design is out now!",
		title: {
			prefix: "Experience the",
			highlight: "Shadcn",
			suffix: "Landing Page",
		},
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio velit cum aliquam. Natus consectetur dolores.",
		primaryCTA: {
			label: "Get Started",
			href: "#",
		},
		secondaryCTA: {
			label: "Learn More",
			href: "#",
		},
		image: {
			src: {
				light: "/dash.png",
				dark: "/dash.png",
			},
			alt: "Hero Image",
		},
	},
	faq: {
		title: "FAQ",
		subtitle: "Frequently Asked Questions",
		list: faq,
	},
	benefits: {
		title: "Benefits",
		subtitle: "Why Choose Us",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio velit cum aliquam. Natus consectetur dolores.",
		list: benefits,
	},
	features: {
		title: "Features",
		subtitle: "What Makes Us Different",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio velit cum aliquam. Natus consectetur dolores.",
		list: features,
	},
	pricing: {
		title: "Pricing",
		subtitle: "Get unlimitted access",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio velit cum aliquam. Natus consectetur dolores.",
		yearlyInsentive: "MORE THAN 33% OFF",
	},
	services: {
		title: "Services",
		subtitle: "Grow Your Business",
		description:
			"From marketing and sales to operations and strategy, we have the expertise to help you achieve your goals.",
		list: serviceList,
	},
};

export default landingConfig;
