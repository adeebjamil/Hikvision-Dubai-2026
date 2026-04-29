import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string, subslug: string } }): Promise<Metadata> {
  const formattedCat = params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const formattedSub = params.subslug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return {
    title: `${formattedSub} ${formattedCat} | Hikvision Dubai`,
    description: `Shop high-performance ${formattedSub} ${formattedCat} by Hikvision. Secure your business with genuine Hikvision products in Dubai.`,
    alternates: {
      canonical: `https://dubai-hikvision.com/products/${params.slug}/${params.subslug}`,
    },
  };
}

export default function SubCategoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
