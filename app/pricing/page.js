// app/pricing/page.js
import { generateMetadata } from '@/lib/metadata';
import PricingClient from './pricing-client';

export const metadata = generateMetadata('pricing');

export default function Pricing() {
  return <PricingClient />;
}