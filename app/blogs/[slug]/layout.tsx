import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const formattedSlug = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return {
    title: `${formattedSlug} | Hikvision Dubai Blog`,
    description: `Read about ${formattedSlug} on the Lovosis Hikvision Dubai blog. Stay updated with the latest security solutions and tips.`,
    alternates: {
      canonical: `https://dubai-hikvision.com/blogs/${slug}`,
    },
  };
}

export default function BlogDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
