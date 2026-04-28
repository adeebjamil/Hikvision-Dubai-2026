import type { Metadata } from 'next';
import { ShieldCheck, Award, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Lovosis',
  description: 'Learn about Lovosis, your trusted Authorized Hikvision Partner in Dubai. Discover our expert team and authorized dealer credentials.',
  alternates: {
    canonical: 'https://dubai-hikvision.com/about',
  },
};

export default function AboutPage() {
  return (
    <article className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">About Lovosis</h1>
          <p className="text-xl text-gray-600">The Leading Authorized Hikvision Partner in Dubai</p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Our Story & Mission</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Lovosis is a premier provider of professional security and surveillance solutions in the UAE. As an officially <strong>Authorized Hikvision Partner</strong>, we are dedicated to delivering genuine products, expert installation, and comprehensive technical support to businesses and homeowners across Dubai.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to safeguard our community by providing state-of-the-art Hikvision technologies—from Network Cameras and NVRs to advanced Access Control systems.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Trust & Credentials (E-E-A-T)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
              <ShieldCheck className="text-red-600 mb-3" size={40} />
              <h3 className="font-bold text-gray-900">Authorized Dealer</h3>
              <p className="text-sm text-gray-600 mt-2">Verified partnership with Hikvision global, ensuring 100% authentic equipment.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
              <Award className="text-red-600 mb-3" size={40} />
              <h3 className="font-bold text-gray-900">Expert Team</h3>
              <p className="text-sm text-gray-600 mt-2">Highly trained technicians offering professional system design and deployment.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
              <MapPin className="text-red-600 mb-3" size={40} />
              <h3 className="font-bold text-gray-900">Local UAE Support</h3>
              <p className="text-sm text-gray-600 mt-2">Dedicated local warranty and technical assistance for all our clients in Dubai.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Our Team & Authorship</h2>
          <div className="bg-red-50 p-6 rounded-lg border border-red-100 flex items-center gap-4">
            <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
              L
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">The Lovosis Security Team</h3>
              <p className="text-gray-700">Content and configurations curated by certified Hikvision professionals with years of field experience in the UAE.</p>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
