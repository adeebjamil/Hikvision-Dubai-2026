import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dubai-hikvision.com'),
  title: {
    default: "Lovosis | Authorized Hikvision Partner Dubai",
    template: "%s | Authorized Hikvision Partner Dubai"
  },
  description: "Lovosis is the authorized Hikvision Partner in Dubai. We offer comprehensive security solutions including Network Cameras, DVR, NVR, Access Control, and Video Intercom.",
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "https://dubai-hikvision.com",
    siteName: "Lovosis - Hikvision Dubai",
    title: "Lovosis | Authorized Hikvision Partner Dubai",
    description: "Lovosis is the authorized Hikvision Partner in Dubai. We offer comprehensive security solutions including Network Cameras, DVR, NVR, Access Control, and Video Intercom.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Lovosis Hikvision Partner" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Lovosis | Authorized Hikvision Partner Dubai",
    description: "Lovosis is the authorized Hikvision Partner in Dubai.",
    images: ["/og-image.jpg"]
  },
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/favicon/android-chrome-192x192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        url: '/favicon/android-chrome-512x512.png',
      },
    ],
  },
  manifest: '/favicon/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://dubai-hikvision.com/#organization",
        "name": "Lovosis - Authorized Hikvision Partner",
        "url": "https://dubai-hikvision.com",
        "logo": "https://dubai-hikvision.com/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+971-55-292-9644",
          "contactType": "sales",
          "email": "sales@lovosis.com",
          "areaServed": "AE",
          "availableLanguage": ["English", "Arabic"]
        },
        "parentOrganization": {
          "@type": "Organization",
          "name": "Hikvision"
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://dubai-hikvision.com/#localbusiness",
        "name": "Lovosis Hikvision Dubai",
        "url": "https://dubai-hikvision.com",
        "telephone": "+971 55 292 9644",
        "email": "sales@lovosis.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dubai",
          "addressRegion": "Dubai",
          "addressCountry": "AE"
        },
        "priceRange": "$$"
      }
    ]
  };

  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <Script
          id="global-schema-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
