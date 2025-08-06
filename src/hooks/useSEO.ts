import { useEffect } from 'react'

interface SEOData {
  title?: string
  description?: string
  keywords?: string
  ogTitle?: string
  ogDescription?: string
  ogUrl?: string
  canonical?: string
}

export function useSEO(data: SEOData) {
  useEffect(() => {
    // Update document title
    if (data.title) {
      document.title = data.title
    }

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name'
      let meta = document.querySelector(`meta[${attribute}="${name}"]`)
      
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attribute, name)
        document.head.appendChild(meta)
      }
      
      meta.setAttribute('content', content)
    }

    if (data.description) {
      updateMetaTag('description', data.description)
    }

    if (data.keywords) {
      updateMetaTag('keywords', data.keywords)
    }

    if (data.ogTitle) {
      updateMetaTag('og:title', data.ogTitle, true)
    }

    if (data.ogDescription) {
      updateMetaTag('og:description', data.ogDescription, true)
    }

    if (data.ogUrl) {
      updateMetaTag('og:url', data.ogUrl, true)
    }

    // Update canonical URL
    if (data.canonical) {
      let canonical = document.querySelector('link[rel="canonical"]')
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.setAttribute('rel', 'canonical')
        document.head.appendChild(canonical)
      }
      canonical.setAttribute('href', data.canonical)
    }
  }, [data])
}