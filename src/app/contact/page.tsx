import ContactPageClient from '@/app/contact/ContactPageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Speed Delivery',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
