import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const formattedSlug = params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return {
    title: `${formattedSlug} Services | Hikvision Dubai`,
    description: `Expert ${formattedSlug} services in Dubai. Get professional installation and support for your Hikvision security systems.`,
    alternates: {
      canonical: `https://dubai-hikvision.com/services/${params.slug}`,
    },
  };
}

export default function ServiceDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
