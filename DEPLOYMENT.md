# GitHub Pages Deployment Guide

This guide will help you deploy your Silent Commit blog to GitHub Pages using the automated GitHub Action.

## Prerequisites

- Your code is in a GitHub repository
- You have admin access to the repository

## Deployment Steps

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **"GitHub Actions"**

### 2. Configure Repository Permissions

1. In the same **Settings** area, go to **Actions** → **General**
2. Under **Workflow permissions**, ensure **"Read and write permissions"** is selected
3. Check **"Allow GitHub Actions to create and approve pull requests"**

### 3. Custom Domain Setup (Optional)

If you want to use your custom domain (silentcommit.com):

1. **DNS Configuration** - Add these records with your domain provider:
   ```
   Type: CNAME
   Name: www
   Value: yourusername.github.io
   
   Type: A  
   Name: @
   Values: 
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

2. **GitHub Configuration:**
   - In repository Settings → Pages
   - Enter your domain in the **Custom domain** field
   - Wait for DNS check to complete (green checkmark)
   - Enable **"Enforce HTTPS"**

### 4. Deploy Your Site

1. **Push to Main Branch:**
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment"
   git push origin main
   ```

2. **Monitor Deployment:**
   - Go to the **Actions** tab in your repository
   - Watch the "Deploy to GitHub Pages" workflow
   - Deployment typically takes 2-3 minutes

3. **Access Your Site:**
   - Custom domain: https://silentcommit.com
   - GitHub Pages: https://yourusername.github.io/repository-name

## Workflow Details

The GitHub Action (`.github/workflows/deploy.yml`) automatically:

1. **Builds** your React app using Vite
2. **Optimizes** assets for production
3. **Deploys** to GitHub Pages
4. **Updates** your live site

## Troubleshooting

### Build Fails
- Check the Actions tab for error details
- Ensure all dependencies are in `package.json`
- Verify TypeScript compiles without errors locally

### Custom Domain Issues
- Verify DNS records are correct
- Wait up to 24 hours for DNS propagation
- Check domain status in Settings → Pages

### 404 Errors
- Ensure `public/CNAME` contains your domain
- Verify the workflow completed successfully
- Check that `dist` folder is being uploaded

## File Structure

Key files for deployment:
```
.github/
└── workflows/
    └── deploy.yml          # GitHub Action workflow
public/
├── CNAME                   # Custom domain configuration
└── robots.txt             # SEO directives
src/
├── config/
│   └── site.ts            # Site URL configuration
└── ...                    # Your app code
```

## Updates and Maintenance

- **Automatic Deployment**: Every push to main branch triggers a new deployment
- **Manual Deployment**: Use the "Run workflow" button in Actions tab
- **Domain Changes**: Update CNAME file and repository settings

## Analytics and Monitoring

Your site includes:
- **Google Analytics**: Tracks visitor behavior
- **Sitemap**: Generated automatically for SEO
- **SEO Meta Tags**: Optimized for search engines

Check your Google Analytics dashboard to monitor site performance after deployment.