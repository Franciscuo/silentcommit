export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  published: boolean;
  author?: string;
  readingTime?: number;
}

export interface Tag {
  name: string;
  count: number;
}
