import type { Metadata } from 'next';
import Script from 'next/script';
import { ShieldCheck, PhoneCall, CheckCircle, ChevronDown, Wrench } from 'lucide-react';

// Mock function for fetching individual product data
async function getProductData(categorySlug: string, subcategorySlug: string, productSlug: string) {
  const catName = categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const subName = subcategorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const prodName = productSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return {
    category: { name: catName, slug: categorySlug },
    subcategory: { name: subName, slug: subcategorySlug },
    product: {
      name: `Hikvision ${prodName}`,
      slug: productSlug,
      sku: `DS-${productSlug.toUpperCase()}`,
      description: `High-performance ${prodName} designed for exceptional surveillance and security in the UAE.`,
      price: 350,
      stockStatus: 'In Stock',
      specs: [
        { label: 'Resolution', value: '4 Megapixel (2560 × 1440)' },
        { label: 'Lens', value: '2.8mm fixed lens' },
        { label: 'Night Vision', value: 'Up to 30m IR range' },
        { label: 'Protection', value: 'IP67 Weatherproof' },
        { label: 'Power', value: 'PoE / 12V DC' }
      ]
    }
  };
}

export async function generateMetadata({ params }: { params: { category: string, subcategory: string, product: string } }): Promise<Metadata> {
  const data = await getProductData(params.category, params.subcategory, params.product);
  const spec1 = data.product.specs[0].value;
  const spec2 = data.product.specs[1].value;
  const spec3 = data.product.specs[2].value;

  return {
    title: `${data.product.name} — Buy in Dubai UAE | Price, Specs, Warranty`,
    description: `Buy ${data.product.name} from authorized Hikvision dealer Dubai. Official UAE warranty. ${spec1}, ${spec2}, ${spec3}. Best price, local stock, installation available.`,
    alternates: {
      canonical: `https://dubai-hikvision.com/products/${data.category.slug}/${data.subcategory.slug}/${data.product.slug}`,
    },
  };
}

export default async function ProductDetailPage({ params }: { params: { category: string, subcategory: string, product: string } }) {
  const data = await getProductData(params.category, params.subcategory, params.product);

  const jsonLdBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dubai-hikvision.com/" },
      { "@type": "ListItem", "position": 2, "name": data.category.name, "item": `https://dubai-hikvision.com/products/${data.category.slug}` },
      { "@type": "ListItem", "position": 3, "name": data.subcategory.name, "item": `https://dubai-hikvision.com/products/${data.category.slug}/${data.subcategory.slug}` },
      { "@type": "ListItem", "position": 4, "name": data.product.name, "item": `https://dubai-hikvision.com/products/${data.category.slug}/${data.subcategory.slug}/${data.product.slug}` }
    ]
  };

  const jsonLdProduct = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": data.product.name,
    "description": data.product.description,
    "image": "https://dubai-hikvision.com/placeholder.jpg",
    "sku": data.product.sku,
    "brand": { "@type": "Brand", "name": "Hikvision" },
    "offers": {
      "@type": "Offer",
      "price": data.product.price,
      "priceCurrency": "AED",
      "availability": "https://schema.org/InStock",
      "seller": { "@type": "Organization", "name": "Lovosis - Authorized Hikvision Partner" },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": "14"
      }
    }
  };

  const jsonLdFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is the warranty on ${data.product.name}?`,
        "acceptedAnswer": { "@type": "Answer", "text": "Official Hikvision UAE warranty (1-3 years depending on model)." }
      },
      {
        "@type": "Question",
        "name": `Is ${data.product.name} suitable for outdoor use in Dubai heat?`,
        "acceptedAnswer": { "@type": "Answer", "text": `Yes, it features an IP67 weatherproof rating making it fully suitable for the harsh Dubai environment.` }
      },
      {
        "@type": "Question",
        "name": `Do you install ${data.product.name} in Dubai?`,
        "acceptedAnswer": { "@type": "Answer", "text": "Yes, professional installation is available by certified Lovosis technicians." }
      }
    ]
  };

  return (
    <article className="min-h-screen bg-gray-50 py-16 px-4">
      <Script id={`schema-breadcrumb-${data.product.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }} />
      <Script id={`schema-product-${data.product.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }} />
      <Script id={`schema-faq-${data.product.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }} />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-200 mb-12">
          {/* Product Image */}
          <div className="bg-gray-100 rounded-xl aspect-square flex items-center justify-center border border-gray-200">
            <span className="text-gray-400 font-bold text-xl">Product Image Placeholder</span>
          </div>

          {/* Product Details Section with Schema-linked IDs */}
          <section id="product-overview" className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-gray-900 text-white px-3 py-1 text-xs font-bold rounded uppercase tracking-wider">{data.product.sku}</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 text-xs font-bold rounded flex items-center gap-1">
                <CheckCircle size={14} /> {data.product.stockStatus}
              </span>
            </div>
            
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{data.product.name}</h1>
            <p className="text-lg text-gray-600 mb-6">{data.product.description}</p>
            
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-4xl font-black text-gray-900">{data.product.price} AED</span>
                <div className="flex items-center gap-1 text-red-600 text-sm font-bold bg-red-50 px-2 py-1 rounded border border-red-100">
                  <ShieldCheck size={16} /> AUTHORIZED DEALER
                </div>
              </div>
              <p className="text-sm text-gray-500">Prices exclude 5% VAT. Subject to availability.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a href="mailto:sales@lovosis.com" className="flex-1 bg-red-600 text-white text-center py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition shadow-md">
                Request Quote
              </a>
              <a href="tel:+971552929644" className="flex-1 border-2 border-gray-900 text-gray-900 text-center py-4 rounded-lg font-bold text-lg hover:bg-gray-900 hover:text-white transition shadow-sm flex items-center justify-center gap-2">
                <PhoneCall size={20} /> Call Expert
              </a>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Wrench size={18} className="text-red-600" /> Need Professional Installation?
              </h3>
              <p className="text-sm text-gray-700">
                Lovosis provides certified Hikvision installation services across Dubai. Add installation to your quote request.
              </p>
            </div>
          </section>
        </div>

        {/* Full Specs Table (GEO Optimization) */}
        <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-gray-900 p-6 border-b bg-gray-50">Technical Specifications</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <tbody>
                {data.product.specs.map((spec, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <th className="py-4 px-6 bg-gray-50 text-gray-900 font-semibold w-1/3 border-r border-gray-100">{spec.label}</th>
                    <td className="py-4 px-6 text-gray-700">{spec.value}</td>
                  </tr>
                ))}
                <tr>
                  <th className="py-4 px-6 bg-gray-50 text-gray-900 font-semibold w-1/3 border-r border-gray-100">Warranty</th>
                  <td className="py-4 px-6 text-gray-700 font-medium">Official UAE Manufacturer Warranty</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Supplementary Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <section className="bg-white p-6 border border-gray-200 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>{data.product.name} Unit</li>
              <li>Installation Manual & Quick Start Guide</li>
              <li>Mounting Hardware</li>
              <li>Waterproof connector (if applicable)</li>
            </ul>
          </section>
          <section className="bg-white p-6 border border-gray-200 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Compatible With</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Hikvision NVRs (Plug and Play)</li>
              <li>Hik-Connect Mobile App</li>
              <li>iVMS-4200 Client Software</li>
              <li>Standard PoE Switches</li>
            </ul>
          </section>
        </div>

        {/* FAQ Section using <details> */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Product FAQs</h2>
          <div className="space-y-4">
            {jsonLdFAQ.mainEntity.map((faq, idx) => (
              <details key={idx} className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900 bg-gray-50 p-4 rounded-lg">
                  <span>{faq.name}</span>
                  <ChevronDown className="text-red-600 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="p-4 text-gray-700 leading-relaxed border-t border-gray-100 bg-white">
                  {faq.acceptedAnswer.text}
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
