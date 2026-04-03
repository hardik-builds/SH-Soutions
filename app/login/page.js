// app/login/page.js
import { generateMetadata } from '@/lib/metadata';
import LoginClient from './login-client';

export const metadata = generateMetadata('login');

export default function Login() {
  return <LoginClient />;
}