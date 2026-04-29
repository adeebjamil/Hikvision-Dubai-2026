import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const formattedSlug = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return {
    title: `${formattedSlug} Services | Hikvision Dubai`,
    description: `Expert ${formattedSlug} services in Dubai. Get professional installation and support for your Hikvision security systems.`,
    alternates: {
      canonical: `https://dubai-hikvision.com/services/${slug}`,
    },
  };
}

export default function ServiceDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
