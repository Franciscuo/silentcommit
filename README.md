# Silent Commit 

A minimalist developer blog built with React, TypeScript, and Tailwind CSS. Features a clean dark theme, markdown support, and SEO optimization.

## 🚀 Features

- **Clean Design**: Minimalist dark theme optimized for reading
- **Markdown Support**: Write posts in markdown with syntax highlighting
- **SEO Optimized**: Meta tags, structured data, and sitemap generation
- **Analytics**: Google Analytics integration
- **Responsive**: Works great on all device sizes
- **Fast**: Built with Vite for optimal performance

## 📦 Tech Stack

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS + Custom CSS variables
- **Build Tool**: Vite
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Phosphor Icons
- **Analytics**: Google Analytics 4
- **Deployment**: GitHub Pages

## 🏗️ Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## 🚀 Deployment to GitHub Pages

The site is configured to automatically deploy to GitHub Pages when changes are pushed to the main branch.

### Setup Instructions:

1. **Enable GitHub Pages:**
   - Go to your repository Settings
   - Navigate to Pages section
   - Source: "GitHub Actions"

2. **Configure Custom Domain (Optional):**
   - Update `public/CNAME` with your domain
   - Update `src/config/site.ts` with your URL
   - Configure DNS records with your domain provider

3. **Push to Main Branch:**
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push origin main
   ```

The GitHub Action will automatically build and deploy your site. Check the Actions tab for deployment status.

## 📝 Content Management

- Blog posts are stored in browser localStorage using the Spark KV system
- Posts support markdown formatting
- Tag-based filtering and search
- Draft/published states
- SEO metadata for each post

## 🔧 Configuration

Key configuration files:
- `src/config/site.ts` - Site metadata and URLs
- `src/index.css` - Theme colors and styling
- `index.html` - SEO meta tags and analytics
- `public/robots.txt` - Search engine directives
- `public/CNAME` - Custom domain configuration

## 📊 Analytics

Google Analytics is pre-configured. Update the measurement ID in `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
```

## 🎨 Customization

The site uses CSS custom properties for theming. Modify colors in `src/index.css`:
```css
:root {
  --background: oklch(0.06 0 0);
  --foreground: oklch(0.93 0 0);
  /* ... other variables */
}
```