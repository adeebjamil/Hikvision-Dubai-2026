import type { Metadata } from 'next';
import Script from 'next/script';
import { CheckCircle } from 'lucide-react';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const titleSlug = params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return {
    title: `${titleSlug} | Lovosis Security Services`,
    description: `Professional ${titleSlug} provided by Lovosis, your Authorized Hikvision Partner in Dubai. Contact us for a quote.`,
    alternates: {
      canonical: `https://dubai-hikvision.com/services/${params.slug}`,
    },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const serviceName = params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Lovosis - Authorized Hikvision Partner",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      }
    },
    "areaServed": "Dubai, UAE",
    "description": `Professional ${serviceName} using genuine Hikvision products.`
  };

  return (
    <article className="min-h-screen bg-gray-50 py-16 px-4">
      <Script
        id={`service-schema-${params.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-200">
        <header className="mb-10 border-b pb-8">
          <p className="text-red-600 font-bold mb-3 tracking-wider text-sm uppercase">Professional Service</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{serviceName}</h1>
          <p className="text-xl text-gray-600">Delivered by Certified Hikvision Experts in Dubai</p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Overview</h2>
          <p className="text-gray-700 leading-relaxed mb-8 text-lg">
            Lovosis provides top-tier <strong>{serviceName}</strong> to ensure your premises are fully secured. As an Authorized Hikvision Partner, we strictly adhere to manufacturer guidelines to deliver optimal performance and longevity for your security infrastructure.
          </p>
          
          <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included:</h3>
          <ul className="space-y-4">
            {[
              "Comprehensive site assessment and planning",
              "Deployment of genuine Hikvision hardware",
              "Professional configuration and network setup",
              "User training and handover",
              "Post-installation technical support"
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-gray-700">
                <CheckCircle className="text-red-600 mt-1 flex-shrink-0" size={20} />
                <span className="text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-gray-50 border border-gray-200 p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Secure Your Property?</h2>
          <p className="text-gray-700 mb-8 text-lg">Contact our sales team today to discuss your {serviceName} requirements in the UAE.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:+971552929644" className="inline-flex items-center justify-center bg-red-600 text-white px-8 py-3 rounded-md font-bold hover:bg-red-700 transition shadow-md">
              Call +971 55 292 9644
            </a>
            <a href="mailto:sales@lovosis.com" className="inline-flex items-center justify-center bg-white text-gray-900 border-2 border-gray-300 px-8 py-3 rounded-md font-bold hover:border-gray-900 transition shadow-sm">
              Email Sales
            </a>
          </div>
        </section>
      </div>
    </article>
  );
}
