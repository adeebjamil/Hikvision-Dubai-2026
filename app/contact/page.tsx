import type { Metadata } from 'next';
import { Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Lovosis | Hikvision Dealer Dubai',
  description: 'Contact Lovosis, the authorized Hikvision partner in Dubai. Call +971 55 292 9644 or email sales@lovosis.com for professional security solutions.',
  alternates: {
    canonical: 'https://dubai-hikvision.com/contact',
  },
};

export default function ContactPage() {
  return (
    <article className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Contact Lovosis</h1>
          <p className="text-xl text-gray-600">Your Authorized Hikvision Partner in Dubai</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-200">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Get In Touch</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Reach out to our expert team for inquiries regarding Hikvision CCTV, NVRs, Access Control, or professional installation services across the UAE.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Phone className="text-red-600 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-gray-900">Phone</h3>
                  <a href="tel:+971552929644" className="text-gray-600 hover:text-red-600 transition block mt-1">+971 55 292 9644</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="text-red-600 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-gray-900">Email</h3>
                  <a href="mailto:sales@lovosis.com" className="text-gray-600 hover:text-red-600 transition block mt-1">sales@lovosis.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="text-red-600 mt-1 flex-shrink-0" size={24} />
                <address className="not-italic">
                  <h3 className="font-bold text-gray-900">Location</h3>
                  <p className="text-gray-600 mt-1">Dubai, United Arab Emirates</p>
                </address>
              </div>
              <div className="flex items-start gap-4 pt-4 border-t border-gray-100">
                <ShieldCheck className="text-red-600 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-gray-900">Authorized Status</h3>
                  <p className="text-gray-600 font-medium text-sm mt-1">Official Hikvision Partner</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <form className="space-y-5" aria-label="Contact Form">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <input type="text" id="name" name="name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <input type="email" id="email" name="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                <textarea id="message" name="message" rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition resize-y" required></textarea>
              </div>
              <button type="submit" className="w-full bg-red-600 text-white font-bold py-4 rounded-lg hover:bg-red-700 transition shadow-md">
                Submit Inquiry
              </button>
            </form>
          </section>
        </div>
      </div>
    </article>
  );
}
