import { useEffect } from 'react'

// Extend window interface for gtag
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void
  }
}

/**
 * Hook for tracking page views and events with Google Analytics
 */
export const useAnalytics = () => {
  const trackPageView = (path: string, title?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-9X2C17JTTJ', {
        page_path: path,
        page_title: title,
      })
    }
  }

  const trackEvent = (action: string, category: string, label?: string, value?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      })
    }
  }

  // Track common blog events
  const trackPostView = (postId: string, postTitle: string) => {
    trackEvent('view_post', 'engagement', `${postId}-${postTitle}`)
  }

  const trackPostEdit = (postId: string) => {
    trackEvent('edit_post', 'content', postId)
  }

  const trackPostCreate = () => {
    trackEvent('create_post', 'content')
  }

  const trackSocialClick = (platform: string) => {
    trackEvent('social_click', 'social', platform)
  }

  const trackTagFilter = (tag: string) => {
    trackEvent('filter_tag', 'navigation', tag)
  }

  return {
    trackPageView,
    trackEvent,
    trackPostView,
    trackPostEdit,
    trackPostCreate,
    trackSocialClick,
    trackTagFilter,
  }
}

/**
 * Hook for automatically tracking page views when component mounts
 */
export const usePageView = (path: string, title?: string) => {
  const { trackPageView } = useAnalytics()

  useEffect(() => {
    trackPageView(path, title)
  }, [path, title, trackPageView])
}