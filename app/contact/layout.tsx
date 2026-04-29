import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Hikvision Support Dubai',
  description: 'Get in touch with Lovosis, the authorized Hikvision dealer in Dubai. Call +971-55-292-9644 or email sales@lovosis.com for quotes and support.',
  alternates: {
    canonical: 'https://dubai-hikvision.com/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
