import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const formattedSlug = params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return {
    title: `${formattedSlug} | Hikvision Dubai`,
    description: `Explore our professional range of Hikvision ${formattedSlug} solutions. Authorized Hikvision partner in Dubai providing official UAE warranty and support.`,
    alternates: {
      canonical: `https://dubai-hikvision.com/products/${params.slug}`,
    },
  };
}

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
