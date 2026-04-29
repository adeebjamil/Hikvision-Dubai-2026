import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string, subslug: string, productSlug: string } }): Promise<Metadata> {
  const formattedProduct = params.productSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return {
    title: `Hikvision ${formattedProduct} | Authorized Dealer in Dubai`,
    description: `Buy Hikvision ${formattedProduct} in Dubai. As an authorized partner, Lovosis offers the best prices, official UAE warranty, and professional installation services.`,
    alternates: {
      canonical: `https://dubai-hikvision.com/products/${params.slug}/${params.subslug}/${params.productSlug}`,
    },
  };
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
