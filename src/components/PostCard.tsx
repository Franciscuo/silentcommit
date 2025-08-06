import React from 'react'
import { BlogPost } from '@/lib/types'
import { formatDate, calculateReadingTime } from '@/lib/blog-utils'
import { Edit3 } from '@phosphor-icons/react'

interface PostCardProps {
  post: BlogPost
  onRead: () => void
  onEdit?: () => void
  showActions?: boolean
}

export function PostCard({ post, onRead, onEdit, showActions = false }: PostCardProps) {
  const readingTime = calculateReadingTime(post.content)

  return (
    <article className="group cursor-pointer" onClick={onRead}>
      <div className="space-y-3 py-6 border-b border-border/50">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-medium text-foreground group-hover:opacity-70 transition-opacity duration-200">
            {post.title}
          </h2>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {!post.published && (
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                Draft
              </span>
            )}
            {showActions && onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit()
                }}
                className="p-1 text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Edit3 size={16} />
              </button>
            )}
          </div>
        </div>
        
        <p className="text-muted-foreground leading-relaxed">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4 text-muted-foreground">
            <span>{formatDate(post.createdAt)}</span>
            <span>{readingTime} min read</span>
          </div>
          
          {post.tags.length > 0 && (
            <div className="flex gap-2">
              {post.tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-xs text-muted-foreground">
                  {tag}
                </span>
              ))}
              {post.tags.length > 2 && (
                <span className="text-xs text-muted-foreground">
                  +{post.tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}