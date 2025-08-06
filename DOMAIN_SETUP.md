# Custom Domain Setup Guide

## Overview
This guide helps you set up a custom domain for your Silent Commit blog.

## Domain Configuration

### 1. Update Site Configuration
The site URL is configured in `src/config/site.ts`. Update the `url` field to your custom domain:

```typescript
export const siteConfig = {
  // ... other config
  url: "https://yourdomainname.com",
  // ... rest of config
}
```

### 2. Environment Variables
For development vs production environments, you can use the `.env` file:

1. Copy `.env.example` to `.env`
2. Set `VITE_SITE_URL=http://localhost:5173` for development
3. For production, the fallback domain in `siteConfig` will be used

### 3. DNS Configuration
Set up these DNS records with your domain provider:

**For GitHub Pages:**
```
Type: CNAME
Name: www (or @)
Value: yourusername.github.io
```

**For Custom Hosting:**
```
Type: A
Name: @
Value: [Your hosting provider's IP]

Type: CNAME  
Name: www
Value: yourdomain.com
```

### 4. SSL Certificate
Most hosting providers (GitHub Pages, Netlify, Vercel) provide automatic SSL certificates for custom domains.

### 5. Update Meta Tags
The following files contain hardcoded URLs that should be updated:

- `index.html` - Meta tags and structured data
- `public/robots.txt` - Sitemap URL
- Components using `siteConfig.url`

## SEO and Analytics

### Google Analytics
Update the measurement ID in `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
```

### Search Console
1. Add your domain to Google Search Console
2. Verify ownership using the HTML file method or DNS
3. Submit your sitemap at `https://yourdomain.com/sitemap.xml`

### Sitemap Generation
The site includes a sitemap generator accessible to blog owners:
- Click the download button in the bottom-right corner
- Upload the generated `sitemap.xml` to your hosting root
- Update `robots.txt` with the correct sitemap URL

## Domain Examples

Replace `silentcommit.dev` throughout the codebase with your domain:
- `silentcommit.dev` → `yourdomain.com`
- Update in `siteConfig.url`
- Update in `index.html` meta tags
- Update in `robots.txt`

## Testing
1. Build the site: `npm run build`
2. Test locally: `npm run preview`
3. Check all internal links work correctly
4. Verify SEO meta tags are correct
5. Test sitemap generation

## Deployment Checklist
- [ ] Domain DNS configured
- [ ] SSL certificate active
- [ ] Site config updated with correct URL
- [ ] Meta tags updated in index.html
- [ ] robots.txt updated with correct sitemap URL
- [ ] Google Analytics configured
- [ ] Search Console verified
- [ ] Sitemap submitted