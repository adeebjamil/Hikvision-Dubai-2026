import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { ShieldCheck, Video, HardDrive, Server, Lock, PhoneCall, Mail, CheckCircle, MapPin, Award, Cpu, ChevronDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Home', // Will use the template from layout.tsx
  description: 'Lovosis is your Authorized Hikvision Partner in Dubai. Get professional security solutions, CCTV, DVR, NVR & Access Control with official UAE warranty.',
  alternates: {
    canonical: 'https://dubai-hikvision.com',
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is Lovosis an authorized Hikvision dealer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Lovosis is a fully authorized Hikvision dealer and partner operating in Dubai, UAE, providing genuine products with official warranties and professional support."
        }
      },
      {
        "@type": "Question",
        "name": "What Hikvision products are available in Dubai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer a complete range of Hikvision products including Network Cameras (IP CCTV), DVRs, NVRs, TurboHD cameras, Access Control systems, and Video Intercom solutions."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide installation services in the UAE?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Lovosis offers professional installation services across Dubai and the wider UAE by certified technicians."
        }
      },
      {
        "@type": "Question",
        "name": "Does Hikvision equipment come with a warranty?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. As an authorized partner, all our Hikvision security solutions come with an official manufacturer's warranty valid in the UAE."
        }
      }
    ]
  };

  return (
    <>
      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Contact Bar */}
      <div className="bg-red-600 text-white text-sm py-2 px-4 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-4">
          <a href="tel:+971552929644" className="flex items-center gap-2 hover:underline">
            <PhoneCall size={16} />
            <span>+971 55 292 9644</span>
          </a>
          <a href="mailto:sales@lovosis.com" className="flex items-center gap-2 hover:underline">
            <Mail size={16} />
            <span>sales@lovosis.com</span>
          </a>
        </div>
        <div className="flex items-center gap-2 font-semibold tracking-wider">
          <ShieldCheck size={18} />
          <span>AUTHORIZED HIKVISION PARTNER</span>
        </div>
      </div>

      <article className="min-h-screen bg-gray-50 text-gray-900">
        {/* Trust Badge Bar (E-E-A-T Signal) */}
        <div className="bg-gray-900 text-gray-200 py-3 text-center text-sm md:text-base px-4 border-b-4 border-red-600 shadow-md">
          <p className="flex items-center justify-center gap-2 font-medium">
            <Award className="text-red-500" size={20} />
            Lovosis: Authorized Hikvision Partner — Official Warranty & UAE Support
          </p>
        </div>

        {/* Hero Section */}
        <section className="bg-white py-16 md:py-24 px-4 border-b border-gray-200">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
              Lovosis: Authorized Hikvision Dealer in Dubai<br className="hidden md:block"/> 
              <span className="text-red-600">— Professional Security Solutions</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              Secure your business and home with industry-leading surveillance systems. We are your trusted, official partner for Hikvision technology in the UAE, delivering authentic products, expert installation, and dedicated local support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="bg-red-600 text-white px-8 py-3 rounded-md font-bold hover:bg-red-700 transition shadow-lg inline-flex items-center justify-center gap-2">
                Explore Products
              </Link>
              <Link href="/contact" className="bg-white text-gray-900 border-2 border-gray-300 px-8 py-3 rounded-md font-bold hover:border-gray-900 transition shadow-sm inline-flex items-center justify-center gap-2">
                Get a Quote
              </Link>
            </div>
          </div>
        </section>

        {/* Trust Signals Section */}
        <section className="py-12 bg-gray-50 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: ShieldCheck, title: 'Authorized Partner', desc: 'Direct relationship with Hikvision global brand.' },
                { icon: CheckCircle, title: 'Official UAE Warranty', desc: 'Guaranteed authentic products with full warranty.' },
                { icon: MapPin, title: 'Local Support', desc: 'Dedicated technical support based right here in Dubai.' },
                { icon: Award, title: 'Professional Installation', desc: 'Certified experts to deploy your security infrastructure.' }
              ].map((trust, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                  <trust.icon className="text-red-600 mb-4" size={40} />
                  <h3 className="text-lg font-bold mb-2">{trust.title}</h3>
                  <p className="text-gray-600 text-sm">{trust.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Categories Section */}
        <section className="py-16 bg-white px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Hikvision Solutions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Discover the complete range of state-of-the-art security and surveillance equipment tailored for your needs.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Video, name: 'Network Cameras', desc: 'Advanced IP cameras featuring ColorVu and AcuSense for 24/7 clarity.', link: '/products/network-cameras' },
                { icon: HardDrive, name: 'NVR', desc: 'Network Video Recorders for high-capacity, reliable IP recording.', link: '/products/nvr' },
                { icon: Server, name: 'DVR', desc: 'Digital Video Recorders ensuring seamless analog/HD surveillance.', link: '/products/dvr' },
                { icon: Cpu, name: 'TurboHD', desc: 'High-definition analog cameras utilizing existing coaxial infrastructure.', link: '/products/turbohd' },
                { icon: Lock, name: 'Access Control', desc: 'Secure facility management with biometrics, cards, and smart readers.', link: '/products/access-control' },
                { icon: PhoneCall, name: 'Video Intercom', desc: 'Smart communication solutions for residential and commercial spaces.', link: '/products/video-intercom' }
              ].map((cat, idx) => (
                <Link href={cat.link} key={idx} className="group p-8 border border-gray-200 rounded-2xl hover:border-red-600 hover:shadow-xl transition-all cursor-pointer bg-gray-50 hover:bg-white block">
                  <cat.icon className="text-red-600 mb-6 group-hover:scale-110 transition-transform" size={48} />
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{cat.name}</h3>
                  <p className="text-gray-600">{cat.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ / AEO Section */}
        <section className="py-20 bg-gray-50 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">Everything you need to know about purchasing Hikvision products in the UAE.</p>
            </div>

            <div className="space-y-4">
              {jsonLd.mainEntity.map((faq, idx) => (
                <details key={idx} className="group bg-white rounded-lg shadow-sm border border-gray-200 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900">
                    <span>{faq.name}</span>
                    <span className="ml-6 flex-shrink-0 text-red-600 group-open:-rotate-180 transition-transform duration-300">
                      <ChevronDown size={20} />
                    </span>
                  </summary>
                  <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100">
                    <p>{faq.acceptedAnswer.text}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
