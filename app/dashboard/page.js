// app/dashboard/page.js
import { generateMetadata } from '@/lib/metadata';
import DashboardClient from './dashboard-client';

export const metadata = generateMetadata('dashboard');

export default function Dashboard() {
  return <DashboardClient />;
}