import React, { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { BlogPost } from '@/lib/types'
import { sortPostsByDate, filterPostsByTag, getAllTags } from '@/lib/blog-utils'
import { samplePost } from '@/lib/sample-data'
import { PostCard } from '@/components/PostCard'
import { PostEditor } from '@/components/PostEditor'
import { PostView } from '@/components/PostView'
import { LandingPage } from '@/components/LandingPage'
import { NotFoundPage } from '@/components/NotFoundPage'
import { Plus, ArrowLeft, Edit3, Eye, Download } from '@phosphor-icons/react'
import { useSEO } from '@/hooks/useSEO'
import { usePageView, useAnalytics } from '@/hooks/useAnalytics'
import { siteConfig } from '@/config/site'
import { downloadSitemap } from '@/lib/sitemap'
// Import spark global shim for production builds
import '@/lib/spark-global'

function App() {
  const [posts, setPosts] = useKV<BlogPost[]>('blog-posts', [])
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [selectedTag, setSelectedTag] = useState<string>('')
  const [showDrafts, setShowDrafts] = useState(false)
  const [currentView, setCurrentView] = useState<'landing' | 'blog' | '404'>('landing')
  const [isOwner, setIsOwner] = useState(false)

  const { trackPostView, trackPostEdit, trackPostCreate, trackTagFilter } = useAnalytics()

  // Check if current user is owner and handle 404 parameter
  useEffect(() => {
    spark.user().then(user => {
      setIsOwner(user.isOwner)
    })
    
    // Check for 404 parameter or session storage flag
    const urlParams = new URLSearchParams(window.location.search)
    const show404FromSession = sessionStorage.getItem('show404')
    
    if (urlParams.get('404') === 'true' || show404FromSession === 'true') {
      setCurrentView('404')
      // Clean up session storage
      sessionStorage.removeItem('show404')
      sessionStorage.removeItem('attemptedUrl')
      // Clean up URL parameter
      if (urlParams.get('404')) {
        window.history.replaceState({}, '', window.location.pathname)
      }
    }
  }, [])

  // Track page views based on current view
  usePageView(
    currentView === 'landing' ? '/' : currentView === 'blog' ? '/posts' : '/404',
    currentView === 'landing' ? "Silent Commit" : currentView === 'blog' ? "Posts - Silent Commit" : "404 - Silent Commit"
  )

  // Set SEO for blog index page
  useSEO({
    title: currentView === 'blog' ? `Posts - ${siteConfig.name}` : currentView === '404' ? `Page Not Found - ${siteConfig.name}` : `${siteConfig.name} - Software Development Insights`,
    description: currentView === 'blog' ? "Browse software development posts covering React, TypeScript, system architecture, and modern web development practices." : currentView === '404' ? "The page you're looking for doesn't exist." : siteConfig.description,
    keywords: "software development, coding, programming, react, typescript, web development, engineering, tech blog",
    canonical: currentView === 'blog' ? `${siteConfig.url}/posts` : currentView === '404' ? `${siteConfig.url}/404` : siteConfig.url
  })

  // Initialize with sample post if no posts exist
  useEffect(() => {
    if (posts.length === 0) {
      setPosts([samplePost])
    }
  }, [posts.length, setPosts])

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
    trackPostCreate()
    setIsCreating(true)
    setEditingPost(null)
  }

  const handleEditPost = (post: BlogPost) => {
    trackPostEdit(post.id)
    setEditingPost(post)
    setIsCreating(true)
  }

  const handleViewPost = (postId: string) => {
    const post = posts.find(p => p.id === postId)
    if (!post) {
      setCurrentView('404')
      return
    }
    trackPostView(post.id, post.title)
    setSelectedPost(post)
  }

  const handleCloseEditor = () => {
    setIsCreating(false)
    setEditingPost(null)
  }

  // Show landing page
  if (currentView === 'landing') {
    return <LandingPage onEnterBlog={() => setCurrentView('blog')} />
  }

  // Show 404 page
  if (currentView === '404') {
    return (
      <NotFoundPage
        onGoHome={() => setCurrentView('landing')}
        onGoBack={() => window.history.back()}
      />
    )
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
      <div className="max-w-3xl mx-auto px-8 py-16">
        {/* Header */}
        <header className="flex items-center justify-between mb-16">
          <button
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
        </header>

        {/* Title */}
        <div className="mb-12">
          <h1 className="text-3xl font-light tracking-tight text-foreground mb-4">Posts</h1>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <button
              onClick={() => setShowDrafts(false)}
              className={showDrafts ? 'opacity-60 hover:opacity-100 transition-opacity' : ''}
            >
              Published ({publishedPosts.length})
            </button>
            {draftPosts.length > 0 && (
              <button
                onClick={() => setShowDrafts(true)}
                className={!showDrafts ? 'opacity-60 hover:opacity-100 transition-opacity' : ''}
              >
                Drafts ({draftPosts.length})
              </button>
            )}
          </div>
        </div>

        {/* Tag Filter */}
        {allTags.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setSelectedTag('')
                  trackTagFilter('all')
                }}
                className={`px-3 py-1 text-sm rounded transition-colors duration-200 ${
                  selectedTag === '' 
                    ? 'bg-foreground text-background' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                All
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => {
                    setSelectedTag(tag)
                    trackTagFilter(tag)
                  }}
                  className={`px-3 py-1 text-sm rounded transition-colors duration-200 ${
                    selectedTag === tag 
                      ? 'bg-foreground text-background' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Posts List */}
        {filteredPosts.length > 0 ? (
          <div className="space-y-8">
            {filteredPosts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onRead={() => handleViewPost(post.id)}
                onEdit={() => handleEditPost(post)}
                showActions={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-6">
              {!showDrafts ? 'No published posts yet.' : 'No drafts yet.'}
            </p>
            <button
              onClick={handleCreateNew}
              className="text-foreground hover:text-muted-foreground transition-colors duration-200"
            >
              Create your first post
            </button>
          </div>
        )}

        {/* Floating Create Button */}
        {isOwner && (
          <div className="fixed bottom-8 right-8 flex flex-col gap-3">
            <button
              onClick={() => downloadSitemap(posts)}
              className="w-12 h-12 bg-muted text-foreground rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-200"
              title="Download Sitemap"
            >
              <Download size={20} />
            </button>
            <button
              onClick={handleCreateNew}
              className="w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-200"
              title="Create New Post"
            >
              <Plus size={20} />
            </button>
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