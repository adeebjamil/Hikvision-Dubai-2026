import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { ShieldCheck, CheckCircle, PenTool, ChevronDown } from 'lucide-react';

// Mock function for fetching category data
async function getCategoryData(categorySlug: string) {
  const formattedName = categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return {
    name: formattedName,
    slug: categorySlug,
    description: `Buy genuine ${formattedName} with official warranty. Authorized Hikvision partner in Dubai. Best prices, local support, professional installation available.`,
    subcategories: [
      { name: `Advanced ${formattedName}`, slug: 'advanced' },
      { name: `Standard ${formattedName}`, slug: 'standard' },
    ]
  };
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = await getCategoryData(categorySlug);
  return {
    title: `${category.name} Dubai | Authorized Hikvision Dealer UAE`,
    description: category.description,
    alternates: {
      canonical: `https://dubai-hikvision.com/products/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params;
  const category = await getCategoryData(categorySlug);

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
        "name": "Products",
        "item": "https://dubai-hikvision.com/products"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": category.name,
        "item": `https://dubai-hikvision.com/products/${category.slug}`
      }
    ]
  };

  const jsonLdCollection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": category.name,
    "description": category.description,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": category.subcategories.map((sub, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": sub.name,
        "url": `https://dubai-hikvision.com/products/${category.slug}/${sub.slug}`
      }))
    }
  };

  return (
    <article className="min-h-screen bg-gray-50 py-16 px-4">
      <Script id={`schema-breadcrumb-${category.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }} />
      <Script id={`schema-collection-${category.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCollection) }} />
      
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-200">
          <p className="text-red-600 font-bold mb-3 tracking-wider text-sm uppercase">Hikvision Category</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">{category.name} — Authorized Hikvision Dealer Dubai</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {category.description}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <span className="flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-full font-semibold text-sm">
              <ShieldCheck size={16} className="text-red-600" /> Official Warranty
            </span>
            <span className="flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-full font-semibold text-sm">
              <CheckCircle size={16} className="text-red-600" /> Local Stock
            </span>
            <span className="flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-full font-semibold text-sm">
              <PenTool size={16} className="text-red-600" /> Professional Installation
            </span>
          </div>
        </header>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 px-2">Subcategories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.subcategories.map((sub, index) => (
              <article key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-red-600 hover:shadow-lg transition">
                <Link href={`/products/${category.slug}/${sub.slug}`} className="block h-full">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{sub.name}</h3>
                  <p className="text-gray-600 mb-4">Explore our range of {sub.name} tailored for robust security in the UAE.</p>
                  <span className="text-red-600 font-semibold hover:underline">View Items &rarr;</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900 bg-gray-50 p-4 rounded-lg">
                <span>Which {category.name} is best for UAE weather?</span>
                <ChevronDown className="text-red-600 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 text-gray-700 bg-white border-t border-gray-100">
                For the extreme UAE climate, we recommend {category.name} models with IP67 ratings and advanced thermal management to ensure continuous operation during peak summer temperatures.
              </div>
            </details>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900 bg-gray-50 p-4 rounded-lg mt-2">
                <span>Do you offer warranty on {category.name}?</span>
                <ChevronDown className="text-red-600 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 text-gray-700 bg-white border-t border-gray-100">
                Yes, as an Authorized Hikvision Partner (Lovosis), all our {category.name} products come with an official UAE manufacturer warranty, providing complete peace of mind.
              </div>
            </details>
          </div>
        </section>
      </div>
    </article>
  );
}
