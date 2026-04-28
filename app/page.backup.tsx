import Hero from '@/components/Hero';
import Technologies from '@/components/Technologies';
import VideoShowcase from '@/components/VideoShowcase';
import ProductShowcase from '@/components/ProductShowcase';
import Features from '@/components/Features';
import ProductGrid from '@/components/ProductGrid';
import FAQ from '@/components/FAQ';
import Link from 'next/link';

export default function Home() {
  return (
    <>
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

