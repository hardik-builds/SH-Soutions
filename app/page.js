// app/page.js
import { generateMetadata } from '@/lib/metadata';
import HomeClient from './home-client';

export const metadata = generateMetadata('home');

export default function Home() {
  return <HomeClient />;
}