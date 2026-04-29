import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Authorized Hikvision Partner Dubai',
  description: 'Learn about Lovosis, your trusted Authorized Hikvision Partner in Dubai. Over 10 years of expertise and 5,000+ secured clients in the UAE.',
  alternates: {
    canonical: 'https://dubai-hikvision.com/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
