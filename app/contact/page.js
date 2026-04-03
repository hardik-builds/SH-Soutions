// app/contact/page.js
import { generateMetadata } from '@/lib/metadata';
import ContactClient from './contact-client';

export const metadata = generateMetadata('contact');

export default function Contact() {
  return <ContactClient />;
}