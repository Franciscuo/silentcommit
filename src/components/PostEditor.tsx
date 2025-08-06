import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BlogPost } from '@/lib/types'
import { generateId, generateExcerpt } from '@/lib/blog-utils'
import { MarkdownRenderer } from './MarkdownRenderer'
import { X, Plus } from '@phosphor-icons/react'

interface PostEditorProps {
  open: boolean
  onClose: () => void
  onSave: (post: BlogPost) => void
  post?: BlogPost
}

export function PostEditor({ open, onClose, onSave, post }: PostEditorProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [published, setPublished] = useState(false)

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setContent(post.content)
      setTags(post.tags)
      setPublished(post.published)
    } else {
      setTitle('')
      setContent('')
      setTags([])
      setNewTag('')
      setPublished(false)
    }
  }, [post, open])

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleSave = (saveAsPublished: boolean) => {
    if (!title.trim() || !content.trim()) return

    const now = new Date().toISOString()
    const blogPost: BlogPost = {
      id: post?.id || generateId(),
      title: title.trim(),
      content: content.trim(),
      excerpt: generateExcerpt(content.trim()),
      tags,
      createdAt: post?.createdAt || now,
      updatedAt: now,
      published: saveAsPublished
    }

    onSave(blogPost)
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault()
      handleAddTag()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {post ? 'Edit Post' : 'Create New Post'}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="edit" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="edit" className="flex-1 overflow-auto space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title..."
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your post content in Markdown..."
                  className="min-h-[300px] font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex gap-2">
                  <Input
                    id="tags"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a tag..."
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddTag}
                    disabled={!newTag.trim()}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-destructive"
                      >
                        <X size={12} />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="flex-1 overflow-auto">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold">{title || 'Untitled Post'}</h1>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <MarkdownRenderer content={content || 'No content yet...'} />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => handleSave(false)}
              disabled={!title.trim() || !content.trim()}
            >
              Save Draft
            </Button>
            <Button
              onClick={() => handleSave(true)}
              disabled={!title.trim() || !content.trim()}
            >
              Publish
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}