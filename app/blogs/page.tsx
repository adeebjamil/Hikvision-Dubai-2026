import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Security Insights & Blogs',
  description: 'Read the latest news and guides on Hikvision security systems, CCTV installation, and surveillance technologies in Dubai by Lovosis.',
  alternates: {
    canonical: 'https://dubai-hikvision.com/blogs',
  },
};

export default function BlogsPage() {
  return (
    <article className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Security Insights & News</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expert articles on CCTV, Access Control, and Hikvision technologies from your Authorized Partner in Dubai.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((id) => (
            <Link href={`/blogs/hikvision-guide-${id}`} key={id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition block">
              <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-400 font-medium">
                Image {id}
              </div>
              <div className="p-6">
                <p className="text-sm font-bold text-red-600 mb-2">SECURITY GUIDES</p>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Understanding Hikvision Solutions {id}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  Discover how the latest Hikvision technology can safeguard your business in Dubai. We break down the features and benefits to help you choose the right system.
                </p>
                <span className="text-red-600 font-semibold hover:underline">Read Article &rarr;</span>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </article>
  );
}
