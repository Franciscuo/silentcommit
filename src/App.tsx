import React, { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BlogPost } from '@/lib/types'
import { sortPostsByDate, filterPostsByTag, getAllTags } from '@/lib/blog-utils'
import { PostCard } from '@/components/PostCard'
import { PostEditor } from '@/components/PostEditor'
import { PostView } from '@/components/PostView'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Plus, FileText, User } from '@phosphor-icons/react'

function App() {
  const [posts, setPosts] = useKV<BlogPost[]>('blog-posts', [])
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [selectedTag, setSelectedTag] = useState<string>('')
  const [showDrafts, setShowDrafts] = useState(false)

  const publishedPosts = posts.filter(post => post.published)
  const draftPosts = posts.filter(post => !post.published)
  
  const currentPosts = showDrafts ? draftPosts : publishedPosts
  const filteredPosts = sortPostsByDate(filterPostsByTag(currentPosts, selectedTag))
  const allTags = getAllTags(posts)

  const handleSavePost = (post: BlogPost) => {
    setPosts(currentPosts => {
      const existingIndex = currentPosts.findIndex(p => p.id === post.id)
      if (existingIndex >= 0) {
        const updated = [...currentPosts]
        updated[existingIndex] = post
        return updated
      }
      return [...currentPosts, post]
    })
  }

  const handleDeletePost = (postId: string) => {
    setPosts(currentPosts => currentPosts.filter(p => p.id !== postId))
  }

  const handleCreateNew = () => {
    setIsCreating(true)
    setEditingPost(null)
  }

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post)
    setIsCreating(true)
  }

  const handleCloseEditor = () => {
    setIsCreating(false)
    setEditingPost(null)
  }

  if (selectedPost) {
    return (
      <PostView
        post={selectedPost}
        onBack={() => setSelectedPost(null)}
        onEdit={() => handleEditPost(selectedPost)}
        showActions={true}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <header className="mb-12 text-center relative">
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <User size={24} className="text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Dev Blog</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Thoughts on software development, architecture, and building things that matter.
          </p>
        </header>

        {/* Simple Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant={!showDrafts ? 'default' : 'outline'}
              onClick={() => setShowDrafts(false)}
              className="flex items-center gap-2"
            >
              <FileText size={16} />
              Published ({publishedPosts.length})
            </Button>
            {draftPosts.length > 0 && (
              <Button
                variant={showDrafts ? 'default' : 'outline'}
                onClick={() => setShowDrafts(true)}
                className="flex items-center gap-2"
              >
                <FileText size={16} />
                Drafts ({draftPosts.length})
              </Button>
            )}
          </div>

          <Button onClick={handleCreateNew} className="flex items-center gap-2">
            <Plus size={16} />
            New Post
          </Button>
        </div>

        {/* Tag Filter */}
        {allTags.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedTag === '' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTag('')}
              >
                All
              </Button>
              {allTags.map(tag => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Posts List */}
        {filteredPosts.length > 0 ? (
          <div className="space-y-6">
            {filteredPosts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onRead={() => setSelectedPost(post)}
                onEdit={() => handleEditPost(post)}
                showActions={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <FileText size={64} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {!showDrafts ? 'No published posts yet' : 'No drafts yet'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {!showDrafts 
                ? 'Start writing and share your thoughts with the world.'
                : 'Create a new post to get started.'
              }
            </p>
            <Button onClick={handleCreateNew} className="flex items-center gap-2">
              <Plus size={16} />
              Create Your First Post
            </Button>
          </div>
        )}

        {/* Post Editor */}
        <PostEditor
          open={isCreating}
          onClose={handleCloseEditor}
          onSave={handleSavePost}
          post={editingPost || undefined}
        />
      </div>
    </div>
  )
}

export default App