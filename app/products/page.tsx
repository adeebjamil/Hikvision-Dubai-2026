import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hikvision Products & Solutions',
  description: 'Explore our complete range of Hikvision products including Network Cameras, DVR, NVR, TurboHD, and Access Control. Authorized dealer in Dubai.',
  alternates: {
    canonical: 'https://dubai-hikvision.com/products',
  },
};

const categories = [
  { id: 'network-cameras', name: 'Network Cameras', desc: 'IP Cameras with ColorVu & AcuSense' },
  { id: 'nvr', name: 'Network Video Recorders (NVR)', desc: 'High-performance IP recording' },
  { id: 'dvr', name: 'Digital Video Recorders (DVR)', desc: 'Seamless analog HD surveillance' },
  { id: 'turbohd', name: 'TurboHD Cameras', desc: 'High-definition analog cameras' },
  { id: 'access-control', name: 'Access Control', desc: 'Biometric and card readers' },
  { id: 'video-intercom', name: 'Video Intercom', desc: 'Smart communication systems' }
];

export default function ProductsPage() {
  return (
    <article className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Hikvision Security Products</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our comprehensive selection of genuine Hikvision hardware. We are an <strong>Authorized Hikvision Partner</strong> supplying to Dubai, UAE.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link href={`/products/${cat.id}`} key={cat.id} className="group border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-red-600 transition block">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="text-red-600" size={28} />
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-red-600 transition">{cat.name}</h2>
              </div>
              <p className="text-gray-600 mb-6">{cat.desc}</p>
              <div className="text-sm font-bold text-red-600 flex items-center gap-2">
                View Specifications <span aria-hidden="true">&rarr;</span>
              </div>
            </Link>
          ))}
        </section>

        <section className="mt-16 bg-gray-50 p-8 rounded-xl border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Buy From Lovosis?</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>100% Genuine Hikvision equipment directly from the manufacturer.</li>
            <li>Official UAE warranty on all hardware components.</li>
            <li>Expert consultation to match the right product to your security needs.</li>
            <li>Professional installation services available across Dubai.</li>
          </ul>
        </section>
      </div>
    </article>
  );
}
