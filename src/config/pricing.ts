import { type PricingPlan } from "@/components/app/pricing/pricing-cards";

const pricingPlans: PricingPlan[] = [
	{
		name: "Basic",
		monthlyPrice: {
			amount: 3.99,
			stripePriceId: "price_1PpLyhLl5WKFdr0UQROTEK3h",
		},
		isDisabled: true,
		annualPrice: {
			amount: 29.99,
			stripePriceId: "price_1PpM3BLl5WKFdr0UlOvCrMNH",
		},
		features: ["1 User", "10GB Storage", "Basic Support"],
	},
	{
		name: "Pro",
		monthlyPrice: {
			amount: 6.99,
			stripePriceId: "price_1Pp2TsLl5WKFdr0Um0X7xFro",
		},
		annualPrice: {
			amount: 59.99,
			stripePriceId: "price_1PpECHLl5WKFdr0UgopMh6h2",
		},
		features: [
			"Everything in Basic",
			"50GB Storage",
			"Priority Support",
			"Advanced Analytics",
		],
	},
	{
		name: "Super",
		monthlyPrice: {
			amount: 11.99,
			stripePriceId: "price_1Pp2VCLl5WKFdr0Ufchbdtfb",
		},
		annualPrice: {
			amount: 99.99,
			stripePriceId: "price_1PpEC0Ll5WKFdr0UO3v5GUgw",
		},
		isHighlighted: true,
		features: [
			"Everything in Pro",
			"500GB Storage",
			"24/7 Support",
			"Custom Solutions",
		],
	},
];

export default pricingPlans;
