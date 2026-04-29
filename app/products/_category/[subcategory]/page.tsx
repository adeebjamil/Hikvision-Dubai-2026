import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { ChevronDown, PhoneCall } from 'lucide-react';

// Mock function for fetching subcategory data
async function getSubcategoryData(categorySlug: string, subcategorySlug: string) {
  const catName = categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const subName = subcategorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return {
    category: { name: catName, slug: categorySlug },
    subcategory: { name: subName, slug: subcategorySlug },
    products: [
      { id: '1', name: `Hikvision Pro ${subName} A1`, specs: '4MP, IR 30m, IP67', price: 250 },
      { id: '2', name: `Hikvision Ultra ${subName} X2`, specs: '8MP, ColorVu, IP67', price: 450 },
      { id: '3', name: `Hikvision Eco ${subName} V1`, specs: '2MP, IR 20m, IP66', price: 150 },
    ]
  };
}

export async function generateMetadata({ params }: { params: Promise<{ category: string, subcategory: string }> }): Promise<Metadata> {
  const { category, subcategory } = await params;
  const data = await getSubcategoryData(category, subcategory);
  return {
    title: `${data.subcategory.name} Dubai | ${data.category.name} Price UAE — Authorized Dealer`,
    description: `Shop ${data.subcategory.name} from authorized Hikvision dealer in Dubai. ${data.category.name} with official warranty. Compare specs, prices. Call +971 55 292 9644.`,
    alternates: {
      canonical: `https://dubai-hikvision.com/products/${data.category.slug}/${data.subcategory.slug}`,
    },
  };
}

export default async function SubcategoryPage({ params }: { params: Promise<{ category: string, subcategory: string }> }) {
  const { category, subcategory } = await params;
  const data = await getSubcategoryData(category, subcategory);

  const jsonLdBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://dubai-hikvision.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": data.category.name,
        "item": `https://dubai-hikvision.com/products/${data.category.slug}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": data.subcategory.name,
        "item": `https://dubai-hikvision.com/products/${data.category.slug}/${data.subcategory.slug}`
      }
    ]
  };

  const jsonLdCollection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": data.subcategory.name,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": data.products.map((p, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://dubai-hikvision.com/products/${data.category.slug}/${data.subcategory.slug}/${p.id}`
      }))
    }
  };

  const jsonLdOfferCatalog = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "name": data.subcategory.name,
    "itemListElement": data.products.map((p) => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Product",
        "name": p.name
      },
      "price": p.price,
      "priceCurrency": "AED"
    }))
  };

  return (
    <article className="min-h-screen bg-gray-50 py-16 px-4">
      <Script id={`schema-breadcrumb-${data.subcategory.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }} />
      <Script id={`schema-collection-${data.subcategory.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCollection) }} />
      <Script id={`schema-offers-${data.subcategory.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOfferCatalog) }} />
      
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-gray-200 pb-8">
          <p className="text-red-600 font-bold mb-2 uppercase text-sm tracking-widest">{data.category.name}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{data.subcategory.name} — Authorized Hikvision Dealer UAE</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Compare top-rated {data.subcategory.name} models. Expertly curated inventory by Lovosis for optimal security deployments in Dubai.
          </p>
        </header>

        {/* Filterable Specs Summary Table (GEO Optimization) */}
        <section className="mb-16 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 p-6 border-b bg-gray-50">Compare {data.subcategory.name} Specifications</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-gray-100 text-gray-800">
                  <th className="py-4 px-6 font-bold border-b border-gray-200">Model Name</th>
                  <th className="py-4 px-6 font-bold border-b border-gray-200">Key Specifications</th>
                  <th className="py-4 px-6 font-bold border-b border-gray-200">Starting Price (AED)</th>
                  <th className="py-4 px-6 font-bold border-b border-gray-200">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.products.map((p) => (
                  <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-4 px-6 font-bold text-gray-900">{p.name}</td>
                    <td className="py-4 px-6 text-gray-600">{p.specs}</td>
                    <td className="py-4 px-6 text-gray-900 font-semibold">{p.price} AED</td>
                    <td className="py-4 px-6">
                      <Link href={`/products/${data.category.slug}/${data.subcategory.slug}/${p.id}`} className="text-red-600 font-bold hover:underline">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Product Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available {data.subcategory.name} Models</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.products.map((p) => (
              <article key={p.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition flex flex-col h-full">
                <div className="bg-gray-100 h-48 rounded-lg mb-6 flex items-center justify-center border border-gray-200">
                  <span className="text-gray-400 font-medium">Product Image</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{p.name}</h3>
                <p className="text-gray-500 text-sm mb-4 flex-grow">{p.specs}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <span className="text-lg font-bold text-gray-900">{p.price} AED</span>
                  <Link href={`/products/${data.category.slug}/${data.subcategory.slug}/${p.id}`} className="bg-red-600 text-white px-4 py-2 rounded font-bold text-sm hover:bg-red-700 transition">
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900 bg-gray-50 p-4 rounded-lg">
                <span>What's the price of {data.subcategory.name} in Dubai?</span>
                <ChevronDown className="text-red-600 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 text-gray-700 bg-white border-t border-gray-100">
                The price for genuine Hikvision {data.subcategory.name} starts from AED 150 up to AED 1500+ depending on the exact specifications and features. For bulk pricing, please contact Lovosis sales.
              </div>
            </details>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900 bg-gray-50 p-4 rounded-lg mt-2">
                <span>Is installation available for these products?</span>
                <ChevronDown className="text-red-600 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 text-gray-700 bg-white border-t border-gray-100">
                Yes! Lovosis provides comprehensive, professional installation services across the UAE by certified Hikvision technicians.
              </div>
            </details>
          </div>
          <div className="mt-8 text-center bg-gray-50 p-6 rounded-lg border border-gray-100">
            <p className="text-gray-700 font-medium mb-3">Need a custom quote?</p>
            <a href="tel:+971552929644" className="inline-flex items-center justify-center gap-2 text-red-600 font-bold hover:underline text-lg">
              <PhoneCall size={20} /> Call +971 55 292 9644
            </a>
          </div>
        </section>
      </div>
    </article>
  );
}
