import type { Metadata } from 'next';
import Script from 'next/script';
import { ShieldCheck } from 'lucide-react';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const titleSlug = params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return {
    title: `${titleSlug} | Hikvision Dubai`,
    description: `Buy authentic Hikvision ${titleSlug} from Lovosis, the authorized Hikvision partner in Dubai. Professional installation and official UAE warranty.`,
    alternates: {
      canonical: `https://dubai-hikvision.com/products/${params.slug}`,
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const productName = params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `Hikvision ${productName}`,
    "description": `Professional Hikvision ${productName} supplied by Lovosis, authorized partner in Dubai.`,
    "brand": {
      "@type": "Brand",
      "name": "Hikvision"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "AED",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Lovosis - Authorized Hikvision Partner"
      }
    }
  };

  return (
    <article className="min-h-screen bg-white py-16 px-4">
      <Script
        id={`product-schema-${params.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 border-b pb-8">
          <div className="flex items-center gap-3 text-red-600 font-bold mb-4">
            <ShieldCheck size={24} />
            <span>AUTHORIZED HIKVISION PARTNER</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Hikvision {productName}</h1>
          <p className="text-xl text-gray-600">High-performance security hardware for reliable surveillance and access control in the UAE.</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div className="bg-gray-50 aspect-video rounded-xl flex items-center justify-center border border-gray-200">
            <span className="text-gray-400 font-medium">Product Image Placeholder</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              The Hikvision {productName} offers industry-leading performance tailored for modern security needs. 
              Sourced directly from the manufacturer, Lovosis guarantees authenticity and provides local technical support in Dubai.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Key Features:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
              <li>Advanced Hikvision imaging/processing technology</li>
              <li>Robust build quality for 24/7 operation</li>
              <li>Seamless integration with existing infrastructure</li>
              <li>Covered by official UAE warranty</li>
            </ul>
            <a href="mailto:sales@lovosis.com" className="inline-block bg-red-600 text-white px-8 py-3 rounded-md font-bold hover:bg-red-700 transition">
              Request a Quote
            </a>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 p-6 border-b bg-gray-50">Technical Specifications</h2>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <tbody>
                <tr className="border-b border-gray-100">
                  <th className="py-4 px-6 bg-gray-50 text-gray-900 font-semibold w-1/3">Brand</th>
                  <td className="py-4 px-6 text-gray-700">Hikvision</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <th className="py-4 px-6 bg-gray-50 text-gray-900 font-semibold w-1/3">Category</th>
                  <td className="py-4 px-6 text-gray-700">{productName}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <th className="py-4 px-6 bg-gray-50 text-gray-900 font-semibold w-1/3">Availability</th>
                  <td className="py-4 px-6 text-gray-700">In Stock (Dubai)</td>
                </tr>
                <tr>
                  <th className="py-4 px-6 bg-gray-50 text-gray-900 font-semibold w-1/3">Warranty</th>
                  <td className="py-4 px-6 text-gray-700">Official UAE Manufacturer Warranty</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </article>
  );
}
