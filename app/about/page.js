// app/about/page.js
import { generateMetadata } from '@/lib/metadata';
import AboutClient from './about-client';

export const metadata = generateMetadata('about');

export default function About() {
  return <AboutClient />;
}