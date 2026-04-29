import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string, subslug: string, productSlug: string }> }): Promise<Metadata> {
  const { slug, subslug, productSlug } = await params;
  const formattedProduct = productSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return {
    title: `Hikvision ${formattedProduct} | Authorized Dealer in Dubai`,
    description: `Buy Hikvision ${formattedProduct} in Dubai. As an authorized partner, Lovosis offers the best prices, official UAE warranty, and professional installation services.`,
    alternates: {
      canonical: `https://dubai-hikvision.com/products/${slug}/${subslug}/${productSlug}`,
    },
  };
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
