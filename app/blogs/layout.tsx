import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security Insights & News | Hikvision Dubai Blog',
  description: 'Read the latest insights, tips, and news about CCTV, access control, and Hikvision security technologies in Dubai.',
  alternates: {
    canonical: 'https://dubai-hikvision.com/blogs',
  },
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
