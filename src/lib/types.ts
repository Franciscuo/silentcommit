export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  tags: string[]
  createdAt: string
  updatedAt: string
  published: boolean
}

export interface BlogState {
  posts: BlogPost[]
  selectedPost: BlogPost | null
  isCreating: boolean
  isEditing: boolean
  filter: string
}