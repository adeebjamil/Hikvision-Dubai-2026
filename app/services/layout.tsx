import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security Services & Installation in Dubai',
  description: 'Professional Hikvision installation, maintenance, and surveillance services in Dubai. SIRA approved experts for your security needs.',
  alternates: {
    canonical: 'https://dubai-hikvision.com/services',
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
