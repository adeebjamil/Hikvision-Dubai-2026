import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Business: Lovosis - Authorized Hikvision Partner Dubai
  // Last Updated: 2026-04-28
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
      crawlDelay: 1,
    },
    sitemap: 'https://dubai-hikvision.com/sitemap.xml',
  };
}
