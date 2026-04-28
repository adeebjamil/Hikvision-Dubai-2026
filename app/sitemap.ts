import { MetadataRoute } from 'next';

const DOMAIN = 'https://dubai-hikvision.com';

// Mock database function
// Replace with real API/database calls
const getMockData = () => {
  const categories = [
    'network-cameras', 'dvr', 'nvr', 'turbo-hd', 'access-control', 'video-intercom'
  ];
  
  const subcategories = [
    { cat: 'network-cameras', subs: ['dome', 'bullet', 'ptz', 'turret', 'panoramic'] },
    { cat: 'dvr', subs: ['4-channel', '8-channel', '16-channel', '32-channel'] },
    { cat: 'nvr', subs: ['poe-nvr', 'wifi-nvr', 'acusense-nvr'] },
    { cat: 'access-control', subs: ['biometric', 'card-readers', 'turnstiles'] }
  ];

  const products = [
    // Network Cameras
    { cat: 'network-cameras', sub: 'bullet', slug: 'DS-2CD2083G2-I', name: '8 MP AcuSense Bullet Camera' },
    { cat: 'network-cameras', sub: 'dome', slug: 'DS-2CD2143G2-IU', name: '4 MP AcuSense Dome Camera' },
    { cat: 'network-cameras', sub: 'ptz', slug: 'DS-2DE4425IW-DE', name: '4 MP 25× Network IR PTZ' },
    { cat: 'network-cameras', sub: 'turret', slug: 'DS-2CD2386G2-IU', name: '8 MP DarkFighter Turret' },
    { cat: 'network-cameras', sub: 'bullet', slug: 'DS-2CD2T87G2-L', name: '8 MP ColorVu Bullet' },
    { cat: 'network-cameras', sub: 'dome', slug: 'DS-2CD2743G2-IZS', name: '4 MP Varifocal Dome' },
    { cat: 'network-cameras', sub: 'ptz', slug: 'DS-2DF8C442IXS-AELW', name: '4 MP 42× DarkFighter PTZ' },
    { cat: 'network-cameras', sub: 'panoramic', slug: 'DS-2CD3T87G2P-LSU-SL', name: '8 MP Panoramic ColorVu' },
    { cat: 'network-cameras', sub: 'turret', slug: 'DS-2CD2347G2-LU', name: '4 MP ColorVu Turret' },
    { cat: 'network-cameras', sub: 'bullet', slug: 'DS-2CD2043G2-I', name: '4 MP AcuSense Bullet' },
    // NVRs
    { cat: 'nvr', sub: 'poe-nvr', slug: 'DS-7608NXI-K2', name: '8-ch 1U K Series AcuSense NVR' },
    { cat: 'nvr', sub: 'poe-nvr', slug: 'DS-7616NXI-K2-16P', name: '16-ch 1U 16 PoE NVR' },
    { cat: 'nvr', sub: 'wifi-nvr', slug: 'DS-7104NI-K1-W-M', name: '4-ch Wi-Fi NVR' },
    { cat: 'nvr', sub: 'acusense-nvr', slug: 'DS-7732NXI-I4-S', name: '32-ch 1.5U AcuSense NVR' },
    { cat: 'nvr', sub: 'poe-nvr', slug: 'DS-7604NI-K1-4P', name: '4-ch 1U 4 PoE NVR' },
    // DVRs
    { cat: 'dvr', sub: '4-channel', slug: 'iDS-7204HUHI-M1-S', name: '4-ch 5 MP 1U H.265 AcuSense DVR' },
    { cat: 'dvr', sub: '8-channel', slug: 'iDS-7208HQHI-M1-S', name: '8-ch 1080p 1U AcuSense DVR' },
    { cat: 'dvr', sub: '16-channel', slug: 'iDS-7216HUHI-M2-S', name: '16-ch 5 MP 1U AcuSense DVR' },
    { cat: 'dvr', sub: '32-channel', slug: 'iDS-7332HQHI-M4-S', name: '32-ch 1080p 1.5U AcuSense DVR' },
    { cat: 'dvr', sub: '8-channel', slug: 'DS-7208HTHI-K2', name: '8-ch 8 MP 1U H.265 DVR' },
    // Access Control
    { cat: 'access-control', sub: 'biometric', slug: 'DS-K1T671MF', name: 'Face Recognition Terminal' },
    { cat: 'access-control', sub: 'card-readers', slug: 'DS-K1107E', name: 'EM Card Reader' },
    { cat: 'access-control', sub: 'biometric', slug: 'DS-K1T341AM', name: 'Value Series Face Access Terminal' },
    { cat: 'access-control', sub: 'turnstiles', slug: 'DS-K3B601', name: 'Swing Barrier Glass Turnstile' },
    { cat: 'access-control', sub: 'biometric', slug: 'DS-K1T804BMF', name: 'Fingerprint Access Control Terminal' },
    // Video Intercom
    { cat: 'video-intercom', sub: 'indoor-station', slug: 'DS-KH6320-WTE1', name: 'Network Indoor Station' },
    { cat: 'video-intercom', sub: 'door-station', slug: 'DS-KV8113-WME1', name: 'Villa Door Station' },
    { cat: 'video-intercom', sub: 'indoor-station', slug: 'DS-KH8350-WTE1', name: 'Ultra Series Indoor Station' },
    { cat: 'video-intercom', sub: 'door-station', slug: 'DS-KD8003-IME1', name: 'Modular Door Station' },
    { cat: 'video-intercom', sub: 'door-station', slug: 'DS-KV6113-WPE1', name: 'Plastic Villa Door Station' }
  ];

  const blogs = [
    'how-to-choose-cctv-for-villa-dubai',
    'hikvision-vs-dahua-uae-comparison',
    'ip-camera-installation-tips-dubai',
    'understanding-hikvision-colorvu-technology',
    'benefits-of-acusense-in-commercial-security',
    'top-5-hikvision-nvrs-for-businesses',
    'biometric-access-control-trends-uae',
    'upgrading-analog-cctv-to-hikvision-ip',
    'video-intercom-systems-for-apartments-dubai',
    'hikvision-warranty-support-guide-uae'
  ];

  const services = [
    'cctv-installation-dubai',
    'cctv-maintenance-uae',
    'access-control-installation',
    'video-intercom-setup'
  ];

  return { categories, subcategories, products, blogs, services };
};

export default function sitemap(): MetadataRoute.Sitemap {
  const data = getMockData();
  const currentDate = new Date();
  const lastMonthDate = new Date();
  lastMonthDate.setMonth(currentDate.getMonth() - 1);

  // 1. Static Pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${DOMAIN}`, lastModified: currentDate, changeFrequency: 'daily', priority: 1.0 },
    { url: `${DOMAIN}/about`, lastModified: lastMonthDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${DOMAIN}/contact`, lastModified: lastMonthDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${DOMAIN}/blogs`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${DOMAIN}/services`, lastModified: lastMonthDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${DOMAIN}/products`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${DOMAIN}/privacy`, lastModified: lastMonthDate, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${DOMAIN}/terms`, lastModified: lastMonthDate, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${DOMAIN}/cookies`, lastModified: lastMonthDate, changeFrequency: 'monthly', priority: 0.3 },
  ];

  // 2. Category Pages
  const categoryPages: MetadataRoute.Sitemap = data.categories.map((cat) => ({
    url: `${DOMAIN}/products/${cat}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // 3. Subcategory Pages
  const subcategoryPages: MetadataRoute.Sitemap = data.subcategories.flatMap(catObj => 
    catObj.subs.map(sub => ({
      url: `${DOMAIN}/products/${catObj.cat}/${sub}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    }))
  );

  // 4. Product Pages (with image sitemap data)
  // Casting to any to allow `images` array as Next.js perfectly renders it in the underlying XML build
  const productPages: any = data.products.map((prod) => ({
    url: `${DOMAIN}/products/${prod.cat}/${prod.sub}/${prod.slug}`,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 0.7,
    images: [
      {
        url: `${DOMAIN}/uploads/products/${prod.slug}.jpg`,
        title: prod.name,
        caption: `Genuine Hikvision ${prod.name} supplied by Lovosis Dubai`
      }
    ]
  }));

  // 5. Blog Posts
  const blogPages: MetadataRoute.Sitemap = data.blogs.map((slug) => ({
    url: `${DOMAIN}/blogs/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  // 6. Service Pages
  const servicePages: MetadataRoute.Sitemap = data.services.map((slug) => ({
    url: `${DOMAIN}/services/${slug}`,
    lastModified: lastMonthDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    ...staticPages,
    ...categoryPages,
    ...subcategoryPages,
    ...productPages,
    ...blogPages,
    ...servicePages
  ];
}
