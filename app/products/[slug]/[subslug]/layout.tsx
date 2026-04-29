import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string, subslug: string }> }): Promise<Metadata> {
  const { slug, subslug } = await params;
  const formattedCat = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const formattedSub = subslug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return {
    title: `${formattedSub} ${formattedCat} | Hikvision Dubai`,
    description: `Shop high-performance ${formattedSub} ${formattedCat} by Hikvision. Secure your business with genuine Hikvision products in Dubai.`,
    alternates: {
      canonical: `https://dubai-hikvision.com/products/${slug}/${subslug}`,
    },
  };
}

export default function SubCategoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
