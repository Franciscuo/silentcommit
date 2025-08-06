import React from 'react'
import { ArrowRight, LinkedinLogo, GithubLogo } from '@phosphor-icons/react'
import { useSEO } from '@/hooks/useSEO'

interface LandingPageProps {
  onEnterBlog: () => void
}

export function LandingPage({ onEnterBlog }: LandingPageProps) {
  // Set SEO for landing page
  useSEO({
    title: "Francisco's Dev Blog - Software Development Insights",
    description: "A developer's thoughts on software engineering, coding practices, and technology insights. Featuring posts on React, TypeScript, and modern web development.",
    keywords: "software development, coding, programming, react, typescript, web development, engineering, tech blog",
    canonical: "https://yoursite.com"
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-8 py-16">
        {/* Main Content */}
        <div className="space-y-16 mt-16">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-light tracking-tight text-foreground mb-6">
              Developer Blog
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Thoughts on software architecture, development practices, and building 
              systems that scale. Written for developers who care about craft.
            </p>
          </div>

          {/* Enter Blog */}
          <div>
            <button
              onClick={onEnterBlog}
              className="group flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors duration-200"
            >
              <span className="text-lg">Read posts</span>
              <ArrowRight 
                size={18} 
                className="group-hover:translate-x-1 transition-transform duration-200" 
              />
            </button>
          </div>

          {/* Topics */}
          <div>
            <h2 className="text-xl font-light text-foreground mb-4">Topics I write about</h2>
            <div className="text-muted-foreground space-y-1">
              <div>• System architecture and design patterns</div>
              <div>• Development workflows and tooling</div>
              <div>• Code quality and maintainability</div>
              <div>• Performance and scalability</div>
              <div>• Team practices and technical leadership</div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h2 className="text-xl font-light text-foreground mb-4">Connect</h2>
            <div className="flex gap-6">
              <a
                href="https://www.linkedin.com/in/franciscuo/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <LinkedinLogo size={20} />
              </a>
              <a
                href="https://github.com/Franciscuo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <GithubLogo size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}