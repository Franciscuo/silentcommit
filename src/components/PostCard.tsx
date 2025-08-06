import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BlogPost } from '@/lib/types'
import { formatDate, calculateReadingTime } from '@/lib/blog-utils'
import { Calendar, Clock, Edit } from '@phosphor-icons/react'

interface PostCardProps {
  post: BlogPost
  onRead: () => void
  onEdit?: () => void
  showActions?: boolean
}

export function PostCard({ post, onRead, onEdit, showActions = false }: PostCardProps) {
  const readingTime = calculateReadingTime(post.content)

  return (
    <Card className="transition-all duration-200 hover:shadow-lg cursor-pointer group">
      <CardHeader onClick={onRead} className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-semibold text-foreground group-hover:text-accent transition-colors">
            {post.title}
          </h3>
          {!post.published && (
            <Badge variant="secondary" className="text-xs">
              Draft
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{readingTime} min read</span>
          </div>
        </div>
      </CardHeader>

      <CardContent onClick={onRead} className="pt-0 pb-4">
        <p className="text-muted-foreground leading-relaxed mb-4">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          {showActions && onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onEdit()
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Edit size={16} />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}