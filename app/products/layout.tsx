import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hikvision Products & Solutions',
  description: 'Explore our complete range of Hikvision products including Network Cameras, DVR, NVR, TurboHD, and Access Control. Authorized dealer in Dubai.',
  alternates: {
    canonical: 'https://dubai-hikvision.com/products',
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
