import Hero from '@/components/Hero';
import type { Metadata } from 'next';
import Script from 'next/script';
import Technologies from '@/components/Technologies';
import VideoShowcase from '@/components/VideoShowcase';
import ProductShowcase from '@/components/ProductShowcase';
import Features from '@/components/Features';
import ProductGrid from '@/components/ProductGrid';
import FAQ from '@/components/FAQ';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Home',
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

      <Hero />
      <Technologies />
      <VideoShowcase />
      {/* Categories Section */}
      <ProductShowcase />

      {/* Features / Services Section */}
      <Features />

      {/* New Product Grid Section */}
      <ProductGrid />

      {/* FAQ Section */}
      <FAQ />
    </>
  );
}

