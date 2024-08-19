import { PricingCard } from '@/components/app/pricing/pricing-cards';
import pricingPlans from '@/config/pricing';

export default async function BillingSettingsPage() {
  return (
    <PricingCard plans={pricingPlans} />
  )
}