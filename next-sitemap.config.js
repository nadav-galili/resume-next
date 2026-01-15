/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://nadav-galili-resume.vercel.app',
  generateRobotsTxt: false, // We have a custom robots.txt
  generateIndexSitemap: false, // Single page site doesn't need index
  changefreq: 'monthly',
  priority: 1.0,
  sitemapSize: 5000,
  exclude: ['/api/*', '/_next/*'],
  // Optional: Add additional paths if needed
  additionalPaths: async (config) => {
    return []
  },
}
