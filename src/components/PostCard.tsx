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
    <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer group">
      <CardHeader onClick={onRead} className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
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
        <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-4">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{post.tags.length - 3}
              </Badge>
            )}
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