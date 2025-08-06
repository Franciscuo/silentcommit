import { siteConfig } from '@/config/site'
import { BlogPost } from '@/lib/types'

export function generateSitemap(posts: BlogPost[]): string {
  const publishedPosts = posts.filter(post => post.published)
  
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteConfig.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteConfig.url}/posts</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  ${publishedPosts.map(post => `  <url>
    <loc>${siteConfig.url}/post/${post.id}</loc>
    <lastmod>${new Date(post.updatedAt || post.createdAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n')}
</urlset>`

  return sitemapContent
}

export function downloadSitemap(posts: BlogPost[]) {
  const sitemap = generateSitemap(posts)
  const blob = new Blob([sitemap], { type: 'application/xml' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = 'sitemap.xml'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  URL.revokeObjectURL(url)
}