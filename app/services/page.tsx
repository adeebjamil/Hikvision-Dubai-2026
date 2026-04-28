import type { Metadata } from 'next';
import Link from 'next/link';
import { Award, ShieldCheck, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hikvision Installation & Security Services Dubai',
  description: 'Professional Hikvision installation, maintenance, and security system design services in Dubai by Lovosis, an authorized partner.',
  alternates: {
    canonical: 'https://dubai-hikvision.com/services',
  },
};

const servicesList = [
  { id: 'cctv-installation', title: 'CCTV Installation', desc: 'Expert deployment of Hikvision Network and TurboHD cameras.' },
  { id: 'access-control-setup', title: 'Access Control Setup', desc: 'Secure facility configuration using biometrics and card readers.' },
  { id: 'system-maintenance', title: 'System Maintenance', desc: 'Ongoing support and health checks for your surveillance infrastructure.' },
  { id: 'security-consultation', title: 'Security Consultation', desc: 'Professional assessment and design of security networks.' }
];

export default function ServicesPage() {
  return (
    <article className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Professional Security Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            End-to-end security solutions provided by Lovosis, the trusted <strong>Authorized Hikvision Partner</strong> in Dubai.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {servicesList.map((service) => (
            <Link href={`/services/${service.id}`} key={service.id} className="bg-gray-50 border border-gray-200 p-8 rounded-xl hover:border-red-600 hover:shadow-md transition block group">
              <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition">{service.title}</h2>
              <p className="text-gray-700 mb-4">{service.desc}</p>
              <span className="text-red-600 font-bold hover:underline">Learn More &rarr;</span>
            </Link>
          ))}
        </section>

        <section className="bg-gray-900 text-white p-10 md:p-14 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold mb-10 text-center">Why Partner With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-gray-800 p-4 rounded-full mb-6">
                <ShieldCheck className="text-red-500" size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3">Certified Technicians</h3>
              <p className="text-gray-400">Our staff is fully trained and certified by Hikvision.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-gray-800 p-4 rounded-full mb-6">
                <Award className="text-red-500" size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3">Authorized Quality</h3>
              <p className="text-gray-400">100% authentic hardware with official warranties.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-gray-800 p-4 rounded-full mb-6">
                <MapPin className="text-red-500" size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3">UAE Wide Reach</h3>
              <p className="text-gray-400">Fast and responsive service delivery across Dubai.</p>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
