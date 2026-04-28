import type { Metadata } from 'next';
import Script from 'next/script';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const titleSlug = params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return {
    title: `${titleSlug} | Lovosis Blog`,
    description: `Read our comprehensive guide on ${titleSlug}. Expert security insights from Lovosis, your Authorized Hikvision Partner in Dubai.`,
    alternates: {
      canonical: `https://dubai-hikvision.com/blogs/${params.slug}`,
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const title = params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": `Comprehensive guide on ${title} by Lovosis.`,
    "author": {
      "@type": "Organization",
      "name": "Lovosis - Authorized Hikvision Partner"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Lovosis Hikvision Dubai",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dubai-hikvision.com/logo.png"
      }
    }
  };

  return (
    <article className="min-h-screen bg-white py-16 px-4">
      <Script
        id={`blog-schema-${params.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto">
        <header className="mb-10 border-b pb-10 text-center">
          <p className="text-red-600 font-bold mb-4 tracking-wider text-sm uppercase">Expert Guide</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">{title}</h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-gray-600">
            <span>By <strong>Lovosis Technical Team</strong></span>
            <span className="hidden md:inline">&bull;</span>
            <span>Authorized Hikvision Partner</span>
          </div>
        </header>

        <section className="prose prose-lg prose-red max-w-none text-gray-700">
          <p className="lead text-xl mb-8 font-medium">
            Welcome to our expert overview of {title}. As a trusted Hikvision dealer in Dubai, Lovosis is committed to bringing you the most accurate and actionable security insights.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Introduction to {title}</h2>
          <p className="mb-6 leading-relaxed">
            Implementing robust security measures is crucial in today's environment. Hikvision hardware provides unparalleled reliability and advanced AI capabilities, making it the top choice for businesses and residences in the UAE. 
            Understanding the full scope of {title} ensures you can maximize the return on your security investment.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Choose Authorized Partners?</h2>
          <p className="mb-6 leading-relaxed">
            Working with an Authorized Hikvision Partner like Lovosis ensures that you receive authentic products, professional installation, and valid warranties. 
            Grey market products can leave your network vulnerable to cyber threats and unsupported in terms of critical firmware updates.
          </p>
          
          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Conclusion</h3>
          <p className="leading-relaxed">
            For more information on deploying Hikvision systems in Dubai and to explore how {title} applies to your specific setup, contact our expert sales team at <a href="mailto:sales@lovosis.com" className="text-red-600 hover:underline">sales@lovosis.com</a>.
          </p>
        </section>
      </div>
    </article>
  );
}
