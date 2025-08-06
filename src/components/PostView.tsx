import React from 'react'
import { BlogPost } from '@/lib/types'
import { formatDate, calculateReadingTime } from '@/lib/blog-utils'
import { MarkdownRenderer } from './MarkdownRenderer'
import { ArrowLeft, Edit3 } from '@phosphor-icons/react'

interface PostViewProps {
  post: BlogPost
  onBack: () => void
  onEdit?: () => void
  showActions?: boolean
}

export function PostView({ post, onBack, onEdit, showActions = false }: PostViewProps) {
  const readingTime = calculateReadingTime(post.content)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-8 py-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
          {showActions && onEdit && (
            <button
              onClick={onEdit}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Edit3 size={16} />
              <span>Edit</span>
            </button>
          )}
        </div>

        {/* Post Header */}
        <header className="mb-12">
          <h1 className="text-3xl font-light tracking-tight text-foreground mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
            <span>{formatDate(post.createdAt)}</span>
            <span>{readingTime} min read</span>
            {!post.published && (
              <span className="bg-muted px-2 py-1 rounded text-xs">Draft</span>
            )}
          </div>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Post Content */}
        <article className="prose max-w-none">
          <MarkdownRenderer content={post.content} />
        </article>
      </div>
    </div>
  )
}