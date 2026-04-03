// app/services/page.js
import { generateMetadata } from '@/lib/metadata';
import ServicesClient from './services-client';

export const metadata = generateMetadata('services');

export default function Services() {
  return <ServicesClient />;
}   