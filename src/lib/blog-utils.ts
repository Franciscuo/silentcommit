import { BlogPost } from './types'

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export function generateExcerpt(content: string, maxLength: number = 160): string {
  const text = content.replace(/[#*`]/g, '').replace(/\n/g, ' ').trim()
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function filterPostsByTag(posts: BlogPost[], tag: string): BlogPost[] {
  if (!tag) return posts
  return posts.filter(post => post.tags.includes(tag))
}

export function getAllTags(posts: BlogPost[]): string[] {
  const tagSet = new Set<string>()
  posts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag))
  })
  return Array.from(tagSet).sort()
}