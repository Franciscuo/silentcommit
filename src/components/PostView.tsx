import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BlogPost } from '@/lib/types'
import { formatDate, calculateReadingTime } from '@/lib/blog-utils'
import { MarkdownRenderer } from './MarkdownRenderer'
import { ArrowLeft, Edit, Calendar, Clock } from '@phosphor-icons/react'

interface PostViewProps {
  post: BlogPost
  onBack: () => void
  onEdit?: () => void
  showActions?: boolean
}

export function PostView({ post, onBack, onEdit, showActions = false }: PostViewProps) {
  const readingTime = calculateReadingTime(post.content)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 -ml-4"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to posts
        </Button>

        <div className="flex items-start justify-between gap-4 mb-4">
          <h1 className="text-4xl font-bold text-foreground leading-tight">
            {post.title}
          </h1>
          {showActions && onEdit && (
            <Button variant="outline" onClick={onEdit}>
              <Edit size={16} className="mr-2" />
              Edit
            </Button>
          )}
        </div>

        <div className="flex items-center gap-6 text-muted-foreground mb-6">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{readingTime} min read</span>
          </div>
          {!post.published && (
            <Badge variant="secondary">Draft</Badge>
          )}
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map(tag => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <article className="prose max-w-none">
        <MarkdownRenderer content={post.content} />
      </article>
    </div>
  )
}