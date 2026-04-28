/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://dubai-hikvision.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.8,
  exclude: ['/admin/*', '/api/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/api'] },
    ],
    additionalSitemaps: ['https://dubai-hikvision.com/sitemap.xml'],
  },
};
