// app/register/page.js
import { generateMetadata } from '@/lib/metadata';
import RegisterClient from './register-client';

export const metadata = generateMetadata('register');

export default function Register() {
  return <RegisterClient />;
}